import { Button, Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { addActivity } from '../services/api';

function ActivityForm({onActivityAdded}) {

    const [activity, setActivity] = useState({
        type: "RUNNING",
        duration: '',
        calories: "",
        metrics: {}
    });

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
          await addActivity(activity);
          onActivityAdded();
          setActivity({
            type: "RUNNING",
            duration: '',
            calories: "",
            metrics: {}
          })
        }catch(err){
          console.error(err);
        }
    }

  return (
    <Box component="form" sx={{ mb: 2 }} onSubmit={handleSubmit}>
    <FormControl fullWidth sx={{ mb: 2}}>
    <InputLabel >Activity Type</InputLabel>
        <Select
            value={activity.type}
            onChange={(e)=>{setActivity({...activity, type: e.target.value})}}
        >
            <MenuItem value="RUNNING">Running</MenuItem>
            <MenuItem value="WALKING">Walking</MenuItem>
            <MenuItem value="CYCLING">Cycling</MenuItem>
        </Select>
    </FormControl>

    <TextField fullWidth
    label="Duration (Minutes)"
    type="number"
    sx={{ mb: 2}}
    value={activity.duration}
    onChange={(e)=>{setActivity({...activity, duration: e.target.value})}}/>
    <TextField fullWidth
    label="Calories Burned"
    type="number"
    sx={{ mb: 2}}
    value={activity.calories}
    onChange={(e)=>{setActivity({...activity, calories: e.target.value})}}/>
      <Button type="Submit"  variant="contained">
          Add Activity
      </Button>
    </Box>
  )
}

export default ActivityForm
