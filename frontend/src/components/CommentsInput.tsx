import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const CommentsInput = () => {
    return (
        <div className="flex items-center w-full">
            <TextField
                fullWidth
                placeholder="What do you think ?"
                className="rounded-full outline-black bg-white"
                slotProps={{
                    input: {
                      className: "pl-12",
                      endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                className="text-black hover:text-green-500 hover:bg-green-100"
                            >
                                <SendIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                }}
            />
        </div>
    )
}

export default CommentsInput;