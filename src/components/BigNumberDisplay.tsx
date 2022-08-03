import NumberFormat from "react-number-format";

interface Props {
  value?: string | number;
  decimalScale?:  number;
  prefix?: string;
}
function BigNumberDisplay({ value, decimalScale = 4, prefix }: Props) {
  return value ? <NumberFormat 
  prefix = {prefix}
  displayType="text" value={value} thousandSeparator={true} decimalScale={decimalScale} /> : <>0</>
}

export default BigNumberDisplay;
