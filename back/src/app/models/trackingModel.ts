import mongoose_delete from "mongoose-delete" 
import mongoose from 'mongoose' 


const { Schema } = mongoose 

const TrackingSchema = new Schema({
  name:{
    type: Schema.Types.String,
  },
  description:{
    type: Schema.Types.String,
  },
  display:{
    icon: {type: Schema.Types.String, default: '🔍'}
  },
  status:{
    type: Schema.Types.String,
    enum: ['crafting', 'active', 'archived'],
    default: 'crafting'
  },
  phase:{
    type: Schema.Types.String,
  },
  target_status:{
    type: Schema.Types.String,
  },
  defaults:{
    again: {
      type: Schema.Types.Boolean,
    }
  }
}, {
  collection: 'trackings', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

TrackingSchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: 'all',
  indexFields: 'all' 
}) 


export const TrackingModel = mongoose.model<any, any>('Tracking', TrackingSchema) 