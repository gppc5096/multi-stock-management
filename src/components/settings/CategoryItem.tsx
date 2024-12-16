import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { OptionItem, OptionCategory } from '@/store/optionSlice';
import { Card } from '@/components/ui/card';

interface CategoryItemProps {
  category: OptionCategory;
  selectedCategory: string;
  isEditing: boolean;
  editingItem: OptionItem | null;
  newValue: string;
  onNewValueChange: (value: string) => void;
  onEdit: (categoryId: string, item: OptionItem) => void;
  onDelete: (categoryId: string, itemId: string) => void;
  onAdd: (categoryId: string) => void;
  onUpdate: () => void;
  onCancelEdit: () => void;
}

export const CategoryItem = ({
  category,
  selectedCategory,
  isEditing,
  editingItem,
  newValue,
  onNewValueChange,
  onEdit,
  onDelete,
  onAdd,
  onUpdate,
  onCancelEdit
}: CategoryItemProps) => {
  return (
    <Card className="border-[#676966] rounded-[5px]">
      <div className="space-y-2">
        {category.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-2 bg-secondary/20 rounded">
            <div>
              <span className="font-medium">{item.value}</span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(category.id, item)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(category.id, item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {(!isEditing || selectedCategory !== category.id) && (
          <div className="mt-4 flex space-x-2">
            <Input
              placeholder="값"
              value={newValue}
              onChange={(e) => onNewValueChange(e.target.value)}
            />
            <Button onClick={() => onAdd(category.id)}>
              <Plus className="h-4 w-4 mr-1" />
              추가
            </Button>
          </div>
        )}

        {isEditing && selectedCategory === category.id && editingItem && (
          <div className="mt-4 flex space-x-2">
            <Input
              placeholder="값"
              value={editingItem.value}
              onChange={(e) => onEdit(category.id, { ...editingItem, value: e.target.value })}
            />
            <Button onClick={onUpdate}>수정 완료</Button>
            <Button variant="outline" onClick={onCancelEdit}>
              취소
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CategoryItem;