/* layouts */
import { PageLayout } from '@/app/infrastructure/layouts';
import { useDataTable } from '@ui/hooks';
import { auxData, type AuxData } from './home.data';
import { useEffect } from 'react';
import { content } from '@ui/utils';
import { Label } from '@ui/components/label';

export default function HomePage() {
  const { updateRawData, updateColumns, dataTable, searchParam, setSearchParam } = useDataTable<
    AuxData,
    'number' | keyof AuxData
  >();

  useEffect(() => {
    updateRawData(auxData);

    updateColumns([
      {
        key: 'number',
        header: () => 'No.',
        toString: () => '',
        cell: params => <Label>{params.metadata.pageIndex + 1}</Label>,
      },
      {
        key: 'id',
        header: () => 'ID',
        toString: item => item.id.toString(),
        cell: params => <Label>{params.metadata.value}</Label>,
      },
      {
        key: 'person',
        header: () => 'Name',
        toString: item => `${item.person.name} ${item.person.lastName}`,
        cell: params => <Label>{params.metadata.value}</Label>,
        searchable: true,
      },
      {
        key: 'contact',
        header: () => 'Address',
        toString: item => item.contact.address,
        cell: params => <Label>{params.metadata.value}</Label>,
        searchable: true,
      },
    ]);
  }, [updateColumns, updateRawData]);

  return (
    <PageLayout>
      <input
        type="text"
        placeholder="Search..."
        value={searchParam}
        onChange={e => setSearchParam(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            {dataTable.header.map((headerCell, index) => (
              <th key={index} colSpan={headerCell.params.metadata.cellSpan}>
                {content(headerCell.cell(headerCell.params))}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataTable.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} colSpan={cell.params.metadata.cellSpan}>
                  {content(cell.cell(cell.params))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </PageLayout>
  );
}
