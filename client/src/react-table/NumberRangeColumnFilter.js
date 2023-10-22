import { useMemo ,useState} from "react";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to

// ones that have values between the two
function NumberRangeColumnFilter({
    column: { filterValue = [], preFilteredRows, setFilter, id }, 
}) {
    const [date, setDate] = useState(new Date());
    const [min, max] = useMemo(() => {
      let min = preFilteredRows.length ? new Date(preFilteredRows[0].values[id]).getTime() : 0
      let max = preFilteredRows.length ? new Date(preFilteredRows[0].values[id]).getTime() : 0
      preFilteredRows.forEach(row => {
        min = Math.min(new Date(row.values[id]).getTime(), min);
        max = Math.max(new Date(row.values[id]).getTime(), max);
      })
      return [min, max]
    }, [id, preFilteredRows])
    console.log(filterValue);
    return (
        <div
            style={{
                display: 'flex',
            }}
        >
            <Flatpickr
                value={filterValue[0] || ''}
                data-enable-time
                onChange={([date]) => {
                    const val = date.getTime();
                    console.log(val);
                    setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]]);
                }}
                style={{
                    width: '70px',
                    marginRight: '0.5rem',
                }}
            />
            to
            <Flatpickr
                value={filterValue[1] || ''}
                data-enable-time
                onChange={e => {
                    const val = e.target.value
                    setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
                }}
                style={{
                    width: '70px',
                    marginLeft: '0.5rem',
                }}
            />
        </div>
    );
};

export default NumberRangeColumnFilter;
  