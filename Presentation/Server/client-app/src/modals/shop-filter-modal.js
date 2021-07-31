import { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import AdminFormControl from "../components/admin-form-control";
import AdminFormGroup from "../components/admin-form-group";
import AdminModal from "../components/admin-modal";
import CustomButton from "../components/custom-button";
import FormCheck from "../components/form-check";
import fetchAllOnlineShopPlatforms from "../use-cases/common/fetch-all-online-shop-platforms";
import fetchAllShopCategories from "../use-cases/common/fetch-all-shop-categories";

const ShopFilterModal = ({ onApply, ...props }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [shopCategories, setShopCategories] = useState([]);
  const [onlineShopPlatforms, setOnlineShopPlatforms] = useState([]);

  const loadFilterData = async () => {
    setShopCategories(await fetchAllShopCategories());
    setOnlineShopPlatforms(await fetchAllOnlineShopPlatforms());
  };

  const initializeModalForms = () => {
    let params = new URLSearchParams(window.location.search);

    setSelectedCategory(params.get('category'));
    setSelectedPlatforms(params.get('onlineshop')?.split(' ') ?? []);
    setMinPrice(params.get('minprice'));
    setMaxPrice(params.get('maxprice'));
  };

  useEffect(() => {
    loadFilterData();
    initializeModalForms();
  }, []);

  useEffect(() => {
    if (props.show) {
      initializeModalForms();
    }
  }, [props.show])

  const applyFilter = () => {
    onApply(selectedCategory, selectedPlatforms, minPrice, maxPrice);

    props.setShow(false);
  };

  return (
    <AdminModal {...props}>
      <Modal.Header>
        <Modal.Title>Filter Pencarian</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className='mb-3'>
          <Form.Label>Kategori</Form.Label>
          <AdminFormControl as='select'
            defaultValue={selectedCategory}
            onChange={(event) => {
              setSelectedCategory(event.target.value);
            }}  
          >
            <option value=''>Jangan filter berdasarkan kategori</option>
            {shopCategories.map(category => {
              return (
                <option value={category.id}>{category.name}</option>
              );
            })}
          </AdminFormControl>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Toko online</Form.Label>
          {onlineShopPlatforms.map(platform => {
            return (
              <FormCheck 
                id={platform.id} 
                label={platform.name}
                defaultChecked={selectedPlatforms.indexOf(platform.id) === -1 ? false : true}
                onChange={(event) => {
                  let index = selectedPlatforms.indexOf(platform.id);

                  let newSelectedPlatforms = [...selectedPlatforms];
                  if (event.target.checked && index === -1) {
                    newSelectedPlatforms.push(platform.id)
                  }
                  else if (!event.target.checked && index !== -1) {
                    newSelectedPlatforms.splice(index, 1);
                  }

                  setSelectedPlatforms(newSelectedPlatforms);
                }} 
              />
            );
          })}
        </Form.Group>
        <Form.Group>
          <Form.Label>Rentang harga</Form.Label>
          <div className='d-flex align-items-center'>
            <AdminFormControl className='mr-1' type='text' 
              defaultValue={minPrice}
              onChange={(event) => {
                setMinPrice(event.target.value);
              }}
            />
            -
            <AdminFormControl className='ml-1' type='text'
              defaultValue={maxPrice}
              onChange={(event) => {
                setMaxPrice(event.target.value);
              }}
            />
          </div>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton onClick={() => applyFilter()}>Terapkan</CustomButton>
        <CustomButton onClick={() => props.setShow(false)} secondary>Batal</CustomButton>
      </Modal.Footer>
    </AdminModal>
  );
};

export default ShopFilterModal;