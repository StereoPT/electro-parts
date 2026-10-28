import { Badge } from "@/components/ui/badge";

type StockBadgeProps = {
  quantity: number;
  minimumQuantity: number;
};

export const StockBadge = ({ quantity, minimumQuantity }: StockBadgeProps) => {
  if (minimumQuantity > 0) {
    if (quantity === 0) {
      return <Badge variant="destructive">Out of stock</Badge>;
    }

    if (quantity <= minimumQuantity) {
      return (
        <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400">
          Low stock
        </Badge>
      );
    }
  }

  if (quantity === 0) {
    return (
      <Badge className="text-muted-foreground" variant="secondary">
        Out of stock
      </Badge>
    );
  }

  return null;
};
