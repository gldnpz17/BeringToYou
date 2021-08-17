import { useEffect, useState } from "react";
import { Tab } from "react-bootstrap";
import AdminFormContainer from "../../components/admin-form-container";
import AdminTable from "../../components/admin-table";
import CustomButton from "../../components/custom-button";
import IconButton from "../../components/icon-button";
import ItemWithIdTableCell from "../../components/item-with-id-table-cell";
import CreateUpdateMapLegendModal from "../../modals/map-legend/create-update-map-legend-modal";
import DeleteIcon from "../../svg/delete-icon";
import EditIcon from "../../svg/edit-icon";
import fetchAllLegends from '../../use-cases/common/fetch-all-legends';
import deleteLegend from '../../use-cases/admin/map/delete-legend';
import { useSnackbar } from "notistack";

const modals = {
  createUpdateLegend: 'create-update-map-legend'
}

const MiscTab = ({ openModal, setOpenModal, ...props }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [legendToUpdate, setLegendToUpdate] = useState(null);
  const [legends, setLegends] = useState([]);

  useEffect(() => {
    if (!openModal) {
      fetchData();
    }
  }, [openModal])

  const fetchData = async () => {
    setLegends(await fetchAllLegends());
  }

  const handleCreateLegend = () => {
    setLegendToUpdate(null);
    setOpenModal(modals.createUpdateLegend);
  }

  const handleUpdateLegend = (legend) => {
    setLegendToUpdate(legend);
    setOpenModal(modals.createUpdateLegend)
  }

  const handleDeleteLegend = async (legend) => {
    if (window.confirm('Hapus legenda?')) {
      let response = await deleteLegend(legend.id);

      if (response.status === 200) {
        enqueueSnackbar('Berhasil menghapus legenda.', {
          variant: 'success'
        });
      } else {
        enqueueSnackbar('Gagal menghapus legenda.', {
          variant: 'error'
        });
      }

      await fetchData();
    }
  }

  return (
    <Tab.Pane {...props}>
      <CreateUpdateMapLegendModal
        legendToUpdate={legendToUpdate}
        show={openModal === modals.createUpdateLegend}
        setShow={(open) => setOpenModal(open ? modals.createUpdateLegend : null)}
      />
      <AdminFormContainer>
        <h1 className='mb-3'>Legenda</h1>
        <CustomButton className='mb-3' onClick={() => handleCreateLegend()}>Legenda Baru</CustomButton>
        <AdminTable>
          <thead>
            <tr>
              <th>Label</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {legends.map(legend => {
              return (
                <tr>
                  <ItemWithIdTableCell>
                    <div>
                      <p>{legend.label}</p>
                      <p className='id'>{legend.id}</p>
                    </div>
                  </ItemWithIdTableCell>
                  <td>
                    <span className='d-flex flex-row justify-content-end'>
                      <IconButton className='p-1 mr-2' iconOnly
                        onClick={() => handleUpdateLegend(legend)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton danger className='p-1' iconOnly
                        onClick={() => handleDeleteLegend(legend)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </AdminTable>
      </AdminFormContainer>
    </Tab.Pane>
  );
}

export default MiscTab;