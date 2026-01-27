import React from 'react';
import { useFida } from '@/app/context/FidaContext';
import { dataCategories } from '@/app/data/mockData';
import { SensitivityBadge } from '@/app/components/FidaComponents';

export const DataCategoriesScreen: React.FC = () => {
  const { t, language } = useFida();

  // Sort categories by sensitivity level (highest first)
  const sortedCategories = [...dataCategories].sort((a, b) => b.sensitivityLevel - a.sensitivityLevel);

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg border border-[var(--fida-divider)] p-6 mb-6 shadow-sm">
        <h3 className="font-semibold text-[var(--fida-text-primary)] mb-4">
          {t('sensitivity.legend')}
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <SensitivityBadge level={3} />
            <p className="text-sm text-[var(--fida-text-secondary)]">
              {t('sensitivity.level3Desc')}
            </p>
          </div>
          <div className="flex items-start gap-3">
            <SensitivityBadge level={2} />
            <p className="text-sm text-[var(--fida-text-secondary)]">
              {t('sensitivity.level2Desc')}
            </p>
          </div>
          <div className="flex items-start gap-3">
            <SensitivityBadge level={1} />
            <p className="text-sm text-[var(--fida-text-secondary)]">
              {t('sensitivity.level1Desc')}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[var(--fida-divider)] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[var(--fida-divider)]">
          <h3 className="font-semibold text-[var(--fida-text-primary)]">
            Alle Datenkategorien
          </h3>
          <p className="text-sm text-[var(--fida-text-secondary)] mt-1">
            Sortiert nach Sensitivitätslevel (höchstes zuerst)
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--fida-surface-2)]">
                <th className="text-left py-3 px-6 text-sm font-semibold text-[var(--fida-text-primary)]">
                  Kategorie
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-[var(--fida-text-primary)]">
                  {t('categories.description')}
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-[var(--fida-text-primary)]">
                  {t('categories.sensitivity')}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedCategories.map(category => (
                <tr key={category.id} className="border-b border-[var(--fida-divider)] last:border-0">
                  <td className="py-4 px-6 text-sm font-medium text-[var(--fida-text-primary)]">
                    {category.name[language] || category.name.de}
                  </td>
                  <td className="py-4 px-6 text-sm text-[var(--fida-text-secondary)]">
                    {category.description[language] || category.description.de}
                  </td>
                  <td className="py-4 px-6">
                    <SensitivityBadge level={category.sensitivityLevel} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};