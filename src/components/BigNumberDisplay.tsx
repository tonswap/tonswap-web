import NumberFormat from "react-number-format";

interface Props {
  value?: string | number;
  decimalScale?:  number;
}
function BigNumberDisplay({ value, decimalScale = 6 }: Props) {
  return value ? <NumberFormat displayType="text" value={value} thousandSeparator={true} decimalScale={decimalScale} /> : <>0</>
}

export default BigNumberDisplay;
