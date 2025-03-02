import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { memo, useState, useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import CryptoRow from "@/components/features/CryptoRow";

const CryptoList = memo(() => {
  const allSymbols = useSelector((state: RootState) => Object.keys(state.binance.entities));
  const [filter, setFilter] = useState("");

  const filteredSymbols = useMemo(() => {
    return allSymbols.filter((symbol) => symbol.toLowerCase().includes(filter.toLowerCase()));
  }, [filter, allSymbols]);

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <div className="p-2">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <List
        height={500}
        itemCount={filteredSymbols.length}
        itemSize={50}
        width="100%"
      >
        {({ index, style }) => (
          <div style={style}>
            <CryptoRow symbol={filteredSymbols[index]} />
          </div>
        )}
      </List>
    </div>
  );
});

export default CryptoList;
