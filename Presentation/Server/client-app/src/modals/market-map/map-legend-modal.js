import { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import styled from "styled-components";
import AdminModal from "../../components/admin-modal";
import fetchAllLegends from "../../use-cases/common/fetch-all-legends";
import fetchAllShopCategories from "../../use-cases/common/fetch-all-shop-categories";

const SectionTitle = styled.h1`
  font-size: 1.4rem;
`;

const SubsectionTitle = styled.h1`
  font-size: 1.2rem;
`;

const Legend = styled(Col)`
  img, span {
    width: 1.6rem;
    height: 1.6rem;
  }

  img {
    object-fit: cover;
  }
`;

const MapLegendModal = ({ ...props }) => {
  const [legends, setLegends] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchLegends();
    fetchCategories();
  }, [])

  const fetchLegends = async () => {
    setLegends(await fetchAllLegends());
  }

  const fetchCategories = async () => {
    setCategories(await fetchAllShopCategories())
  }

  return (
    <AdminModal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>Legenda</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SectionTitle>Peta Dasar</SectionTitle>
        <Row className='mb-4' xs={2} sm={3}>
          {legends.map(legend => {
            return (
              <Col>
                <Legend className='p-2 d-flex align-items-center'>
                  <img src={`/api/public/assets/${legend.iconFilename}`} />
                  <p className='mb-0 ml-1'>{legend.label}</p>
                </Legend>
              </Col>
            )
          })}
        </Row>
        <SectionTitle>Kategori Toko</SectionTitle>
        {categories.map(category => {
          return (
            <>
              <SubsectionTitle>{category.name}</SubsectionTitle>
              {(category?.subcategories?.length > 0)
                ? <Row className='mb-3' xs={2} sm={3}>
                  {category.subcategories.map(subcategory => {
                    return (
                      <Col>
                        <Legend className='p-2 d-flex align-items-center'>
                          <span style={{ backgroundColor: subcategory.rgbHexLegendColor }} />
                          <p className='mb-0 ml-1'>{subcategory.name}</p>
                        </Legend>
                      </Col>
                    );
                  })}
                </Row>
                : <p style={{ fontSize: '0.9rem', color: 'grayText' }}>Kategori toko ini tidak memiliki subkategori.</p>
              }
            </>
          );
        })}
      </Modal.Body>
    </AdminModal>
  );
};

export default MapLegendModal;