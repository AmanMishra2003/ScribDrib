
const Room = require("../models/roomModel");
const Comment = require("../models/comments");

// Call this after mongoose.connect(...)
async function watchRoomDelete() {
    console.log("⏳ Starting TTL Watcher for Room deletions...");

    // Start watching changes on Room collection
    const changeStream = Room.watch();

    changeStream.on("change", async (change) => {

        // We only care when a document is deleted (TTL triggers this)
        if (change.operationType === "delete") {
            const deletedRoomId = change.documentKey._id;

            console.log("🗑 Room auto-deleted by TTL:", deletedRoomId);

            // Delete all comments belonging to that room
            await Comment.deleteMany({ roomId: deletedRoomId });

            console.log("🧹 Deleted all comments for room:", deletedRoomId);
        }
    });
}

module.exports = watchRoomDelete;
