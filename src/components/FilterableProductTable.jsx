import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PRODUCT_PROP_TYPE = {
  category: PropTypes.string,
  price: PropTypes.string,
  stocked: PropTypes.bool,
  nameL: PropTypes.string,
};
const PRODUCTS_PROP_TYPE = {
  products: PropTypes.arrayOf(PropTypes.shape(PRODUCT_PROP_TYPE)).isRequired,
};

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}
ProductCategoryRow.propTypes = {
  category: PropTypes.string.isRequired,
};

function ProductRow({ product }) {
  const name = product.stocked ? product.name : <span style={{ color: 'red' }}>{product.name}</span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}
ProductRow.propTypes = {
  ...PRODUCT_PROP_TYPE,
};

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }

    if (inStockOnly && !product.stocked) {
      return;
    }

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />,
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name}
      />,
    );

    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
ProductTable.propTypes = {
  ...PRODUCTS_PROP_TYPE,
  filterText: PropTypes.string,
  inStockOnly: PropTypes.bool,
};
ProductTable.defaultProps = {
  filterText: '',
  inStockOnly: false,
};

function SearchBar({
  filterText, inStockOnly, onFilterTextChange, onInStockChange,
}) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={onFilterTextChange}
      />
      <label htmlFor="stock-checkbox">
        <input
          id="stock-checkbox"
          type="checkbox"
          checked={inStockOnly}
          onChange={onInStockChange}
        />
        Only show products in stock
      </label>
    </form>
  );
}
SearchBar.propTypes = {
  filterText: PropTypes.string,
  inStockOnly: PropTypes.bool,
  onFilterTextChange: PropTypes.func.isRequired,
  onInStockChange: PropTypes.func.isRequired,
};
SearchBar.defaultProps = {
  filterText: '',
  inStockOnly: false,
};

export default function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  function updateFilterText(e) {
    const newFilterText = e.target.value;

    setFilterText(newFilterText);
  }

  function updateInsTock(e) {
    const newInStock = e.target.checked;

    setInStockOnly(newInStock);
  }

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={(e) => { updateFilterText(e); }}
        onInStockChange={(e) => { updateInsTock(e); }}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}
FilterableProductTable.propTypes = {
  ...PRODUCTS_PROP_TYPE,
};
