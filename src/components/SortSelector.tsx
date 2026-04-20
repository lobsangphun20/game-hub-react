import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

interface Props {
  onSelectSortOrder: (order: string) => void;
  selectedSortOrder?: string;
}

const SortSelector = ({ onSelectSortOrder, selectedSortOrder }: Props) => {
  const sortOrders = [
    { value: "", label: "Relevance" },
    { value: "name", label: "Name" },
    { value: "-released", label: "Release Date" },
    { value: "-added", label: "Date Added" },
    { value: "-rating", label: "Average Rating" },
    { value: "-metacritic", label: "Popularity" },
  ];

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Sort by :{" "}
        {selectedSortOrder
          ? sortOrders.find((order) => order.value === selectedSortOrder)?.label
          : "relevance"}
      </MenuButton>
      <MenuList>
        {sortOrders.map((order) => (
          <MenuItem
            onClick={() => {
              console.log(order.label);
              onSelectSortOrder(order.value);
            }}
            key={order.value}
          >
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
