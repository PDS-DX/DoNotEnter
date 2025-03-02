import { FormEvent, useState } from "react";
import {Box, IconButton, InputAdornment, styled, OutlinedInput} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface ChatInputProps {
  onReply: (message: string) => void;
}

const ReplyInput = styled(OutlinedInput)(({ theme }) => ({
    width: "100%",
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(2),
    color: "white"
}));

export default function ChatInput({ onReply }: ChatInputProps) {
  const [reply, setReply] = useState("");

  const handleReplyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReply(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (reply.trim()) {
      onReply(reply);
      setReply("");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <ReplyInput
        type="text"
        value={reply}
        onChange={handleReplyChange}
        placeholder="Type your message here..."
        endAdornment={
            <InputAdornment position="end">
                <IconButton onClick={handleSubmit} color="primary">
                    <SendIcon/>
                </IconButton>
            </InputAdornment>
        }
      />
    </Box>
  );
}
