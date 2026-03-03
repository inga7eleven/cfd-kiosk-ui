import { CartItem } from '../App';

interface TallyAreaProps {
  cartItems: CartItem[];
  showDiscount?: boolean;
}

export function TallyArea({ cartItems, showDiscount = false }: TallyAreaProps) {
  // Filter out any undefined items and calculate totals
  const validItems = cartItems.filter(item => item != null);
  const subtotal = validItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = showDiscount ? 1.79 : 0;
  const afterDiscount = subtotal - discount;
  const tax = afterDiscount * 0.08; // 8% tax
  const total = afterDiscount + tax;

  // Dynamic positioning based on discount visibility
  const taxTop = showDiscount ? 669 : 638;
  const totalTop = showDiscount ? 700 : 669;

  return (
    <div className="absolute contents left-0 top-0" data-name="Tally Area">
      <div className="absolute bg-white h-[800px] left-0 top-0 w-[475px]" data-name="Background Tally Area">
        <div className="absolute bg-white inset-[0_0.26%_90.13%_0]" data-name="BG" />
        <div className="absolute bg-[#d3d3d3] inset-[9.25%_0.26%_90.63%_0]" data-name="Line - Horizontal" />
        <p className="absolute font-['Roboto:Bold',sans-serif] font-bold inset-[2.13%_32.11%_92.88%_31.84%] leading-[40px] text-[#2c2f35] text-[28px] text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
          Your Items
        </p>
        <div className="absolute bg-[#e9e9e9] inset-[0_0_0_99.74%]" data-name="Line - Vertical" />
      </div>

      {/* Scrollable items area */}
      <div className="absolute left-0 top-[79px] w-[475px] h-[528px] overflow-y-auto">
        {validItems.map((item, index) => (
          <div 
            key={item.id} 
            className="h-[32px] w-[475px] relative" 
            style={{ top: `${index * 32}px` }}
            data-name="Line Item - Regular"
          >
            <div className="absolute bg-white inset-0" data-name="BG" />
            <p className="absolute font-['Roboto:Medium',sans-serif] font-medium inset-[28.13%_34.3%_0_10.03%] leading-[normal] text-[#2c2f35] text-[20px] whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontVariationSettings: "'wdth' 100" }}>
              {item.name}
            </p>
            <p className="absolute font-['Roboto:Medium',sans-serif] font-medium inset-[28.13%_91.29%_0_2.64%] leading-[normal] text-[#2c2f35] text-[20px] text-right" style={{ fontVariationSettings: "'wdth' 100" }}>
              {item.quantity}
            </p>
            <div className="absolute h-[23px] left-[263px] top-[9px] w-[116px]" data-name="Line Item Price">
              <p className="absolute font-['Roboto:Medium',sans-serif] font-medium inset-[0_27.59%_0_0] leading-[normal] text-[#2c2f35] text-[20px] text-right whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Subtotal */}
      <div className="absolute h-[31px] left-0 top-[607px] w-[475px]" data-name="Subtotal Line">
        <div className="absolute bg-white inset-0" data-name="BG" />
        <div className="absolute h-[23px] left-[359px] top-[5.81px] w-[116px]" data-name="Bottom Line - Tally">
          <p className="absolute font-['Roboto:Regular',sans-serif] inset-[0_27.59%_4.35%_0] leading-[normal] not-italic text-[#2c2f35] text-[19px] text-right whitespace-pre-wrap">${subtotal.toFixed(2)}</p>
        </div>
        <div className="absolute inset-[18.75%_32.72%_12.5%_4.22%]" data-name="Running Total Title">
          <p className="absolute font-['Roboto:Regular',sans-serif] inset-0 leading-[normal] not-italic text-[#2c2f35] text-[19px] whitespace-pre-wrap">Subtotal</p>
        </div>
      </div>

      {/* Discount total */}
      {showDiscount && (
        <div className="absolute h-[31px] left-0 top-[638px] w-[475px]" data-name="Discount Line">
          <div className="absolute bg-white inset-0" data-name="BG" />
          <div className="absolute h-[23px] left-[359px] top-[5.81px] w-[116px]" data-name="Bottom Line - Tally">
            <p className="absolute font-['Roboto:Regular',sans-serif] inset-[0_27.59%_4.35%_0] leading-[normal] not-italic text-[#EE1C25] text-[19px] text-right whitespace-pre-wrap">-${discount.toFixed(2)}</p>
          </div>
          <div className="absolute inset-[18.75%_32.72%_12.5%_4.22%]" data-name="Running Total Title">
            <p className="absolute font-['Roboto:Regular',sans-serif] inset-0 leading-[normal] not-italic text-[#2c2f35] text-[19px] whitespace-pre-wrap">Discount(s)</p>
          </div>
        </div>
      )}

      {/* Tax */}
      <div className="absolute h-[31px] left-0 w-[475px]" style={{ top: `${taxTop}px` }} data-name="Tax Line">
        <div className="absolute bg-white inset-0" data-name="BG" />
        <div className="absolute h-[23px] left-[359px] top-[5.81px] w-[116px]" data-name="Bottom Line - Tally">
          <p className="absolute font-['Roboto:Regular',sans-serif] inset-[0_27.59%_4.35%_0] leading-[normal] not-italic text-[#2c2f35] text-[19px] text-right whitespace-pre-wrap">${tax.toFixed(2)}</p>
        </div>
        <div className="absolute inset-[18.75%_32.72%_12.5%_4.22%]" data-name="Running Total Title">
          <p className="absolute font-['Roboto:Regular',sans-serif] inset-0 leading-[normal] not-italic text-[#2c2f35] text-[19px] whitespace-pre-wrap">Tax</p>
        </div>
      </div>

      {/* Final Total */}
      <div className="absolute h-[100px] left-0 w-[475px]" style={{ top: `${totalTop}px` }} data-name="Final Total">
        <div className="absolute bg-[#e9e9e9] inset-[10%_0_0_0]" data-name="BG" />
        <div className="absolute bg-white inset-[0_0_90%_0]" data-name="Spacer" />
        <p className="absolute font-['Roboto:Bold',sans-serif] font-bold leading-[normal] left-[335px] text-[#2c2f35] text-[24px] text-right top-[41px] w-[107px] whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          ${total.toFixed(2)}
        </p>
        <p className="absolute font-['Roboto:Bold',sans-serif] font-bold inset-[41%_37.73%_31%_4.22%] leading-[normal] text-[#2c2f35] text-[24px] whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Balance Due
        </p>
      </div>
    </div>
  );
}