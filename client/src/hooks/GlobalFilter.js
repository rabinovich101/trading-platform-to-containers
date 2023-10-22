import { useState } from "react";
import { useAsyncDebounce } from "react-table";

function GlobalFiler({   preGlobalFilteredRows, globalFilter, setGlobalFilter, }) {
    //const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
      }, 200)
  return (
      <div>
          <input
              value={value || ""}
              onChange={e => { setValue(e.target.value); onChange(e.target.value); }} 
              placeholder={`Search...`}
          />
      </div>
  )
}

export default GlobalFiler;