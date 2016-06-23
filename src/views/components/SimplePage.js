import React from 'react';
import { Link } from 'react-router';
import { Grid } from 'react-mdl';
import ContentCell, { renderCell } from './ContentCell.js'

const SimplePage = (data, middleware = x => x) => data !== undefined ? <Grid className="MainGrid">{data.map(middleware).map(renderCell)}</Grid> : <div />

export default SimplePage;
