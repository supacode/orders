import { AppButton } from '../../components/ui/AppButton';
import { AppCheckbox } from '../../components/ui/AppCheckbox';
import { AppPopover } from '../../components/ui/AppPopover';
import { compareValues } from '../../utils/compareValues';

export const OrdersTableFilter: React.FC<{
  label: string;
  options: (string | number)[];
  selected: (string | number)[];
  onChange: (values: (string | number)[]) => void;
}> = ({ label, options, selected, onChange }) => {
  const toggleOption = (option: string | number) => {
    onChange(
      selected.includes(option)
        ? selected.filter((val) => val !== option)
        : [...selected, option],
    );
  };

  return (
    <AppPopover
      trigger={
        <AppButton
          variant="solid"
          color="secondary"
          endContent={
            selected.length > 0 ? (
              <p className="text-black">{`(${selected.length})`}</p>
            ) : null
          }
        >
          {label}
        </AppButton>
      }
    >
      <div className="p-2 space-y-1">
        <div className="flex gap-2 p-2 border-b border-gray-300">
          <AppButton
            size="sm"
            variant="ghost"
            onClick={() => onChange(options)}
          >
            Select All
          </AppButton>
          {selected.length > 0 && (
            <AppButton
              size="sm"
              variant="ghost"
              onClick={() => onChange([])}
              color="danger"
            >
              Clear
            </AppButton>
          )}
        </div>
        <div className="flex flex-col gap-2 p-2">
          {[...options]
            .sort((a, b) => compareValues(a, b))
            .map((option) => (
              <AppCheckbox
                key={option}
                label={`${option}`}
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
              />
            ))}
        </div>
      </div>
    </AppPopover>
  );
};
