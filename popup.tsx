import { useStorage } from "@plasmohq/storage/hook";

import "./style.css";
import clsx from "clsx";

export default function IndexPopup() {
  const max = 5;
  const [ytItemsPerRow, setYtItemsPerRow] = useStorage("ytItemsPerRow", max);

  return (
    <div className="p-3">
      <h1 className="text-[16px] mb-3 text-center font-bold text-gray-800">
        Columns per row
      </h1>
      <fieldset className="inline-flex rounded-md shadow-xs">
        {[...Array(5).keys()].map((_, i) => {
          const isFirst = i === 0;
          const isLast = i === max - 1;
          const isSelected = i === ytItemsPerRow - 1;

          return (
            <button
              type="button"
              key={`yt-items-per-row-${i}`}
              onClick={() => setYtItemsPerRow(i + 1)}
              className={clsx(
                {
                  "rounded-s-lg": isFirst,
                  "rounded-e-lg": isLast,
                  "bg-red-600 text-white hover:bg-red-700 hover:text-white focus:text-white":
                    isSelected,
                  "bg-white text-gray-900 hover:bg-gray-100 hover:text-red-700 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-700 focus-within:text-red-700":
                    !isSelected,
                },
                "px-4 py-2 text-sm font-medium focus:ring-offset-0 focus:ring-0 border border-gray-200",
              )}
            >
              {i + 1}
            </button>
          );
        })}
      </fieldset>
    </div>
  );
}
