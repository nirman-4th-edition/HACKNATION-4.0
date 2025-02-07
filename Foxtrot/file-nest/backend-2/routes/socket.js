import { messageModel } from "../db/db.js";
import { processImage } from "../modules/ImageProcessor.js";
import { imageMetaModel } from "../db/db.js";

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`User ${socket.id} joined room: ${room}`);
    });

    socket.on(
      "sendMessage",
      async ({ room, sender, message, file, fileName, timestamp }) => {
        const chatMessage = {
          sender,
          message,
          file: file || null, // file url
          timestamp: timestamp || new Date(),
          fileName: fileName || null,
        };

        // Emit message to all users in the room
        io.to(room).emit("receiveMessage", chatMessage);

        // Store in MongoDB
        try {
          await messageModel.create({ room, ...chatMessage });
          console.log("Message stored in MongoDB");
        } catch (error) {
          console.error("Error saving message:", error);
        }

        if (file) {
          try {
            const extractResult = await processImage(file);
            // console.log("Extract result:", extractResult);

            if (extractResult) {
              const imageMeta = {
                room,
                sender,
                fileUrl: file,
                dir: extractResult.Result || extractResult, // Adjust according to your Flask API response format
                timestamp: new Date(),
                fileName,
              };

              await imageMetaModel.create(imageMeta);
              console.log("Image metadata stored in MongoDB");
            } else {
              console.log(
                "No extract data received from Flask for file:",
                file
              );
            }
          } catch (error) {
            console.error("Error processing/storing image metadata:", error);
          }
        }
      }
    );

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

export { socketHandler };
