# Promo Codes - Available Discounts

## Available Promo Codes

### 1. **FRESH20** - 20% Off
- **Discount:** 20% on all orders
- **Max Discount Cap:** ₹1,000
- **Valid For:** All orders
- **Maximum Uses:** 100

### 2. **ORGANIC15** - 15% Off
- **Discount:** 15% on organic products
- **Max Discount Cap:** ₹750
- **Valid For:** All orders
- **Maximum Uses:** 150

### 3. **FIRST50** - ₹50 Off
- **Discount:** Fixed ₹50 off
- **Valid For:** All orders
- **Maximum Uses:** 50

### 4. **SAVE100** - ₹100 Off (Orders ₹500+)
- **Discount:** Fixed ₹100 off
- **Minimum Order Amount:** ₹500
- **Max Discount Cap:** ₹100
- **Valid For:** Orders above ₹500
- **Maximum Uses:** 200

### 5. **WELCOME10** - 10% Welcome Discount
- **Discount:** 10% off
- **Max Discount Cap:** ₹500
- **Valid For:** All orders
- **Maximum Uses:** 500

---

## How Promo Codes Work

1. **Enter the promo code** in the "Apply Promo Code" section on the checkout page
2. **Click "Apply"** or press Enter
3. **Discount is calculated** based on your order amount
4. **Order total is updated** with the discount applied
5. **Payment is processed** with the discounted amount

---

## Discount Rules

- Discount is applied to the **subtotal** before tax and delivery
- **Tax** is calculated on the **discounted amount**
- **Delivery charges** may be free if order (after discount) exceeds ₹500
- Only **one promo code** per order

---

## Example Calculations

### Example 1: FRESH20 (20% Off)
```
Subtotal: ₹1,000
Discount (20%): -₹200
After Discount: ₹800
Tax (5%): ₹40
Delivery: FREE (₹800 > ₹500)
TOTAL: ₹840
```

### Example 2: SAVE100 (₹100 Off)
```
Subtotal: ₹600
Minimum required: ✓ ₹600 > ₹500
Discount: -₹100
After Discount: ₹500
Tax (5%): ₹25
Delivery: FREE (₹500 = ₹500)
TOTAL: ₹525
```

### Example 3: FIRST50 (₹50 Off)
```
Subtotal: ₹300
Discount: -₹50
After Discount: ₹250
Tax (5%): ₹12.50
Delivery: ₹50 (₹250 < ₹500)
TOTAL: ₹312.50
```

---

## Adding New Promo Codes

To add new promo codes, edit the `PROMO_CODES` array in:
```
src/app/api/promo/validate/route.ts
```

Example:
```typescript
{
  code: 'SUMMER30',
  discountType: 'percentage',
  discountValue: 30,
  description: '30% off summer sale',
  maxUses: 200,
  maxDiscountAmount: 1500,
}
```

Or for fixed discount:
```typescript
{
  code: 'FIXED200',
  discountType: 'fixed',
  discountValue: 200,
  description: '₹200 off on orders above ₹1000',
  maxUses: 100,
  minOrderAmount: 1000,
  maxDiscountAmount: 200,
}
```

---

## Promo Code Fields

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `code` | ✓ | string | Unique promo code (uppercase) |
| `discountType` | ✓ | string | 'percentage' or 'fixed' |
| `discountValue` | ✓ | number | Discount amount or percentage |
| `description` | ✓ | string | User-friendly description |
| `maxUses` | ✓ | number | Maximum times code can be used |
| `maxDiscountAmount` | ✓ | number | Maximum discount cap |
| `minOrderAmount` | ✗ | number | Minimum order amount required |

---

## Testing

Test these promo codes on the checkout page:
- ✅ FRESH20
- ✅ ORGANIC15
- ✅ FIRST50
- ✅ SAVE100
- ✅ WELCOME10

All codes are case-insensitive.
