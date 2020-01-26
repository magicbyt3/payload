import React from 'react';
import PropTypes from 'prop-types';
import Section from '../../../layout/Section';
import RenderFields from '../../RenderFields';

import './index.scss';

const Group = (props) => {
  const { label, fields, name, defaultValue } = props;

  return (
    <Section
      heading={label}
      className="field-group"
    >
      <RenderFields fields={fields.map((subField) => {
        return {
          ...subField,
          name: `${name}.${subField.name}`,
          defaultValue: defaultValue[subField.name],
        };
      })} />
    </Section>
  );
};

Group.defaultProps = {
  label: '',
  defaultValue: {},
};

Group.propTypes = {
  defaultValue: PropTypes.shape({}),
  fields: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default Group;