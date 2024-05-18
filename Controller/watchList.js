import watchList from "../Modals/watchList.js"

export const creatWatchList = async(req,resp) =>{
    try {
        const { userId, date, data } = req.body;
    
        if (!userId || !date || !data) {
          return resp.status(400).json({ success: false, message: "Missing required fields" });
        }
    
        const addData = {};
        addData[date] = data;
    
        let watchlist = await watchList.findOne({ userId: userId });
    
        if (watchlist) {
          // If the watchlist exists, update it
          watchlist.watchList.push(addData);
          await watchlist.save();
          resp.status(200).json({ success: true, message: "Watchlist Added", watchlist });
        } else {
          // If the watchlist does not exist, create a new one
          watchlist = new watchList({
            userId,
            watchList: [addData]
          });
          await watchlist.save();
          resp.status(201).json({ success: true, message: "Watchlist created", watchlist });
        }
      } catch (error) {
        console.log("error in createWatchList: ", error);
        resp.status(500).json({ success: false, message: "Server error" });
      }
}

export const getAllWatchListStocks = async(req,resp)=>{
    try {
        const { userId } = req.query;
    
        if (!userId) {
          return res.status(400).json({ success: false, message: 'Missing userId' });
        }
    
        const watchlist = await watchList.findOne({ userId });
    
        if (watchlist) {
          resp.status(200).json({ success: true, watchlist });
        } else {
          resp.status(404).json({ success: false, message: 'Watchlist not found for the user' });
        }
      } catch (error) {
        console.error('Error in getAllWatchList: ', error);
        resp.status(500).json({ success: false, message: 'Server error' });
      }
}

export const removeWatchList = async(req,resp) =>{
    try {
        const { userId, date } = req.body;
    
        if (!userId || !date) {
          return resp.status(400).json({ success: false, message: "Missing required fields" });
        }
    
        // Find the document and update it by pulling the entry with the specified date
        const result = await watchList.findOneAndUpdate(
          { userId: userId },
          { $pull: { watchList: { [date]: { $exists: true } } } },
          { new: true }
        );
    
        if (result) {
          resp.status(200).json({ success: true, message: "Watchlist entry removed", watchlist: result });
        } else {
          resp.status(404).json({ success: false, message: "Watchlist not found for the user" });
        }
      } catch (error) {
        console.log("error in removeFromWatchList: ", error);
        resp.status(500).json({ success: false, message: "Server error" });
      }
}