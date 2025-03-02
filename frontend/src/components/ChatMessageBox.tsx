import {Box, styled} from "@mui/material";

interface ChatMessageBoxProps {
  message: string;
  role: "system" | "user" | "assistant";
}

const MessageBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "role",
})<{ role: "user" | "assistant" | "system" }>(({ theme, role }) => ({
    backgroundColor: role === "user" ? "#578503" : "#079dab",
    color: "white",
    padding: theme.spacing(1, 1.5),
    margin: theme.spacing(1.5, 1),
    float: role === "user" ? "right" : "left",
    width: "75%",
    border: "2px solid",
    borderColor: role === "user" ? "#263b01" : "#03494f",
    borderTopLeftRadius: theme.spacing(2),
    borderBottomLeftRadius: role === "user" ? 0 : theme.spacing(2),
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: role === "assistant" ? 0 : theme.spacing(2),
    display: role === "system" ? "none" : "block",
}));

export default function ChatMessageBox({ message, role }: ChatMessageBoxProps) {
  return (
    <MessageBox role={role}>
      <p>{message}</p>
    </MessageBox>
  );
}