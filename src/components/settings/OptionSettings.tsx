import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { 
  addOptionItem, 
  updateOptionItem, 
  deleteOptionItem,
  updateExchangeRate,
  OptionItem 
} from '@/store/optionSlice';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import CategoryItem from './CategoryItem';
import ExchangeRateSettings from './ExchangeRateSettings';

const OptionSettings = () => {
  const dispatch = useDispatch();
  const options = useSelector((state: RootState) => state.options);
  const [newValue, setNewValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<OptionItem | null>(null);

  const handleAddItem = (categoryId: string) => {
    if (!newValue) {
      toast.error('모든 필드를 입력해주세요.');
      return;
    }

    dispatch(addOptionItem({
      categoryId,
      item: {
        id: Date.now().toString(),
        value: newValue.toUpperCase(),
        label: newValue
      }
    }));
    setNewValue('');
    toast.success('항목이 추가되었습니다.');
  };

  const handleUpdateItem = () => {
    if (!editingItem || !selectedCategory) return;

    dispatch(updateOptionItem({
      categoryId: selectedCategory,
      itemId: editingItem.id,
      updates: {
        value: editingItem.value.toUpperCase(),
        label: editingItem.value
      }
    }));
    setIsEditing(false);
    setEditingItem(null);
    toast.success('항목이 수정되었습니다.');
  };

  const handleDeleteItem = (categoryId: string, itemId: string) => {
    dispatch(deleteOptionItem({ categoryId, itemId }));
    toast.success('항목이 삭제되었습니다.');
  };

  const handleExchangeRateChange = (value: string) => {
    const rate = parseFloat(value);
    if (!isNaN(rate)) {
      dispatch(updateExchangeRate(rate));
    }
  };

  const handleEditStart = (categoryId: string, item: OptionItem) => {
    setSelectedCategory(categoryId);
    setEditingItem(item);
    setIsEditing(true);
  };

  if (!options?.categories) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">옵션 설정</h3>
        <div className="space-y-4">
          {options.categories.map((category) => (
            <Card key={category.id} className="p-4">
              <h4 className="font-medium mb-2">{category.name}</h4>
              <CategoryItem
                category={category}
                selectedCategory={selectedCategory}
                isEditing={isEditing}
                editingItem={editingItem}
                newValue={newValue}
                onNewValueChange={setNewValue}
                onEdit={handleEditStart}
                onDelete={handleDeleteItem}
                onAdd={handleAddItem}
                onUpdate={handleUpdateItem}
                onCancelEdit={() => {
                  setIsEditing(false);
                  setEditingItem(null);
                }}
              />
            </Card>
          ))}
        </div>
      </div>

      <ExchangeRateSettings
        exchangeRate={options.exchangeRate}
        onExchangeRateChange={handleExchangeRateChange}
      />
    </div>
  );
};

export default OptionSettings;