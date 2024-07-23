import { server } from "./server.js";
import { changeTypes, modelEvents } from "./constants.js";

// add mongo schema middleware
// and broadcast notifications on change
export const registerNotificationEvents = (modelName, schema) => {
  schema
    .post(modelEvents.SAVE, function (data) {
      // Access the senderId from the saveOptions
      const senderId = this.$__?.saveOptions?.senderId;
      console.log('senderId', senderId);
        server.broadcast({
          type: changeTypes.INSERT,
          model: modelName,
          data,
        }, senderId);
      }
    )
    .post(modelEvents.UPDATE, function (data) {
        // Access the senderId from the saveOptions
        const senderId = this.$__?.saveOptions?.senderId;
        server.broadcast({
          type: changeTypes.UPDATE,
          model: modelName,
          data,
        }, senderId)
      }
    )
    .post(modelEvents.DELETE, function (data) {
      // Access the senderId from the saveOptions
      const senderId = this.$__?.saveOptions?.senderId;
        server.broadcast({
          type: changeTypes.DELETE,
          model: modelName,
          data,
        }, senderId)
      }
    );
};
