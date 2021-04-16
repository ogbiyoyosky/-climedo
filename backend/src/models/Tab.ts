
import mongoose, { Schema, Document, model, Model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface ITab extends Document {
    name: String,
    description: String,
    dataPoints: [any],

}

export let TabSchema: Schema<ITab> = new Schema({
  name: {
    type: String,
    required: "Please provide a name"
  },
  description: {
    type: String,
    required: "Please provide a description"
  },
  dataPoints: [{
      dataType: {
        type: String,
        enum: ['text', 'selection','number', 'date'],
        required: "provide type of dataType"
      },
      label: String,
      description: String,
      options: [{
          type: String,
          enum: ['0', '1', '2', '3', '4', '5', 'unknown']
      }],
      placeholder: String,
  }]
});

TabSchema.plugin(uniqueValidator);



interface TabSchemaDoc extends ITab, Document {}

const TabModel: Model<TabSchemaDoc> = model<TabSchemaDoc>(
  "Tab",
  TabSchema
);

export default TabModel;