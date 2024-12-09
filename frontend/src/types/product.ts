
import type { Product } from "@/app/types/Product";

export type ProductCardProps = {
    _id: string;
    productData: Product;
    editable?: boolean;
    onClick?: () => void;
    onEdit?: (product: Product) => void;
    onCreate?: (product: Product) => void;
    onDelete?: (_id: string) => void;
}
