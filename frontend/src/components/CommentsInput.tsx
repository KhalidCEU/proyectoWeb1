import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface CommentsInputProps {
    onSubmit: (comment: string) => void;
}

const CommentsInput = ({ onSubmit }: CommentsInputProps) => {
    const [comment, setComment] = useState('');

    const handleSendClick = () => {
        if (comment.trim()) {
            onSubmit(comment);
            setComment('');
        }
    };

    return (
        <div className="flex items-center w-full">
            <TextField
                fullWidth
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What do you think ?"
                className="rounded-full outline-black bg-white"
                slotProps={{
                    input: {
                      className: "pl-12",
                      endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                className="text-black hover:text-green-500 hover:bg-green-100"
                                onClick={handleSendClick}
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