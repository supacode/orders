import { useState } from 'react';
import { Link } from 'react-router-dom';

import { AppButton } from '../../components/ui/AppButton';
import { AppInput } from '../../components/ui/AppInput';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { Preset } from './types';

type OrdersPresetProps = {
  searchParams: URLSearchParams;
};

export const OrdersPreset: React.FC<OrdersPresetProps> = ({ searchParams }) => {
  const [presets, setPresets] = useLocalStorage<Preset[]>(
    'orders-table-presets',
    [],
  );

  const [presetName, setPresetName] = useState('');

  const handleSave = () => {
    const trimmedName = presetName.trim();

    if (!trimmedName) return;

    const newPreset: Preset = {
      id: crypto.randomUUID(),
      name: trimmedName,
      queryString: `${searchParams}`,
    };

    setPresets((prevPresets) => [...prevPresets, newPreset]);

    setPresetName('');
  };

  const handleClear = () => setPresets([]);

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <div className="flex gap-2">
        <AppInput
          type="text"
          value={presetName}
          onChange={(e) => setPresetName(e.target.value)}
          placeholder="Preset name"
        />
        <AppButton onClick={handleSave}>Save Preset</AppButton>
      </div>

      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <AppButton
            key={preset.id}
            size="sm"
            variant="solid"
            color="secondary"
            as={Link}
            to={`?${preset.queryString}`}
          >
            {preset.name}
          </AppButton>
        ))}

        {presets.length > 0 && (
          <AppButton
            size="sm"
            variant="ghost"
            color="danger"
            onClick={handleClear}
          >
            Clear Presets
          </AppButton>
        )}
      </div>
    </div>
  );
};
