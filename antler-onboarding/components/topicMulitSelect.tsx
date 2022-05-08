import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

function TopicMultiSelect({ id, topics }) {
  const [topicName, setTopicName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof topicName>) => {
    const {
      target: { value },
    } = event;
    setTopicName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <FormControl sx={{ m: 1, width: "310px" }}>
      <InputLabel id="demo-multiple-name-label">Topics</InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        multiple
        required
        value={topicName}
        onChange={handleChange}
        style={{
          width: "100%",
          fontWeight: 500,
        }}
        input={<OutlinedInput label="Name" id={id} />}
      >
        {topics.map(({ id, name }) => (
          <MenuItem key={id} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
export default TopicMultiSelect;
