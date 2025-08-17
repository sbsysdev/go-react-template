/* react */
import { useEffect } from 'react';
/* layouts */
import { PageLayout } from '@/app/infrastructure/layouts';
/* components */
import { Label } from '@ui/components/label';
import { Field } from '@ui/components/field';
import { Icon } from '@ui/components/icon';
/* hooks */
import { useDataTable } from '@ui/hooks';
/* utils */
import { content } from '@ui/utils';
import { auxData, type AuxData } from './home.data';
/* assets */
import { mdiMagnify } from '@mdi/js';

export default function HomePage() {
  const {
    updateRawData,
    updateColumns,
    dataTable,
    searchParam,
    setSearchParam,
    sortColumn,
    unsortColumn,
    setPaginate,
    setCurrentPage,
    setPerPage,
    isStaleSearchParam,
  } = useDataTable<AuxData, 'number' | 'index' | keyof AuxData>();

  useEffect(() => {
    updateRawData(auxData);

    updateColumns([
      {
        key: 'number',
        header: () => <Label weight="lg">No.</Label>,
        cell: params => <Label>{params.metadata.dataIndex + 1}</Label>,
      },
      {
        key: 'index',
        header: () => <Label weight="lg">Index</Label>,
        cell: params => <Label>{params.metadata.pageIndex + 1}</Label>,
      },
      {
        key: 'id',
        header: () => <Label weight="lg">Person ID</Label>,
        toString: item => item.id.toString(),
        cell: params => <Label>{params.metadata.value}</Label>,
      },
      {
        key: 'person',
        header: () => <Label weight="lg">Name</Label>,
        toString: item => `${item.person.name} ${item.person.lastName}`,
        cell: params => <Label>{params.metadata.value}</Label>,
        searchable: true,
      },
      {
        key: 'contact',
        header: () => <Label weight="lg">Address</Label>,
        toString: item => item.contact.address,
        cell: params => <Label>{params.metadata.value}</Label>,
        searchable: true,
      },
    ]);

    sortColumn('person', 'ASC');
    // unsortColumn();
    setCurrentPage(1);
    setPerPage(20);
    setPaginate(true);
  }, [
    setCurrentPage,
    setPaginate,
    setPerPage,
    sortColumn,
    unsortColumn,
    updateColumns,
    updateRawData,
  ]);

  return (
    <PageLayout>
      <Field
        name="search"
        label="Search"
        hint="search by name or address"
        after={props => <Icon path={mdiMagnify} {...props} />}>
        {props => (
          <input
            type="text"
            placeholder="Search..."
            value={searchParam}
            onChange={e => setSearchParam(e.target.value)}
            {...props}
          />
        )}
      </Field>

      <table style={{ opacity: isStaleSearchParam ? 0.5 : 1 }}>
        <thead style={{ textAlign: 'left' }}>
          <tr>
            {dataTable.header.cells.map((headerCell, index) => (
              <th key={index} colSpan={headerCell.params.metadata.cellSpan}>
                {content(headerCell.cell(headerCell.params))}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {dataTable.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.cells.map((cell, cellIndex) => (
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
