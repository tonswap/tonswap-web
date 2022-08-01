import NumberFormat from "react-number-format";

interface Props {
  value?: string | number;
  decimalScale?:  number;
}
function BigNumberDisplay({ value = '0', decimalScale = 6 }: Props) {
  return <NumberFormat displayType="text" value={value} thousandSeparator={true} decimalScale={decimalScale} />;
}

export default BigNumberDisplay;
