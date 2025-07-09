import {createGlobalStyle, css} from "styled-components";
import Roboto from "../assets/fonts/Roboto-Regular.ttf";

const baseStyles = css`
  @font-face {
    font-family: "Roboto";
    src: url(${Roboto}) format("TrueType");
    font-weight: 400;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box !important;
    text-decoration: none;
  }

  body {
    font-size: 12px;
    font-family: "Roboto", Courier, monospace !important;
    background: #e5e5e5;
  }

  a {
    color: #0a4972;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  /*============== ANIMATIONS ================*/
  @keyframes transition-in {
    from {
      opacity: 0;
      transform: translateY(-60px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes opacity-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes menu-in {
    from {
      transform: translateX(-98%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes menu-out {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-98%);
    }
  }

  @keyframes options-in {
    from {
      grid-template-columns: 100% auto;
    }
    to {
      grid-template-columns: 65% auto;
    }
  }

  @keyframes options-out {
    from {
      grid-template-columns: 65% auto;
    }
    to {
      grid-template-columns: 100% auto;
    }
  }

  @keyframes submenu-in {
    from {
      height: 0;
    }
    to {
      height: 90px;
    }
  }

  @keyframes submenu-out {
    from {
      height: 90px;
    }
    to {
      height: 0;
    }
  }

  @keyframes smenu-in {
    from {
      width: 38%;
    }
    to {
      width: 100%;
    }
  }

  @keyframes smenu-out {
    from {
      width:100%;
    }
    to {
      width: 38%;
    }
  }
  
  
    @keyframes container-in {
    from {
      margin-left: -160px;
     
    }
    to {
      margin-left: 0px;
    }
  }

  @keyframes container-out {
    from {
      margin-left: 0px;
    }
    to {
      margin-left: -160px;
    }
  }
  /*============ CUSTOMIZATION ============*/

  .toast {
    position: fixed;
    top: 10vh;
    right: 10px;
    animation: opacity-in 0.2s linear forwards;
  }

  .close span {
    height: 100% !important;
  }

  .input-group textarea {
    resize: none;
  }

  .form-control-sm {
    padding: 4px 10px !important;
    border: 1px solid #002f59;
    border-radius: 2px !important;
    font-size: 1em;
  }

  .form-control-sm:focus {
    outline: 2px solid #90caf9;
  }

  .input-file {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column wrap;
    padding: 15px;
    background: #f8f8f8;
    border-radius: 10px;
    text-align: center;
    border: 1px solid #bdc0c2;
  }

  .input-file.dragin {
    background: rgba(144, 202, 249, 0.2);
    border: 1px solid #00a3ff;
  }

  .input-file.dragin > div {
    border: 1px dashed #00a3ff;
  }

  .input-file > div {
    width: 100%;
    padding: 20px;
    border: 1px dashed #bdc0c2;
  }

  .input-file p {
    color: #b4b4b4;
    margin: 5px;
  }

  .input-file input {
    display: none;
  }

  .btn {
    padding: 5px 10px;

    border-radius: 2.5px;

    cursor: pointer;

    font-size: 1em;
    transition: all 0.3s;
  }

  .btn:hover {
    filter: brightness(90%);
  }

  .btn-cancel {
    background: #fff;
    color: #002f59;
    border: 1px solid #7a929e;
  }

  .btn-coen {
    background: #22279b;
    color:#fff;
  }

  .btn-light {
    background: #ffffff;
    color: #00a3ff;
  }

  .btn-light:hover {
    background: #ccc;
    color: #fff;
  }

  .btn-digeo {
    background: #ff5c00;
    box-shadow: 0px 0px 0px 1px #ff5c00;
    color:#fff;
  }

  .btn-file {
    background: transparent;
    border: 1px solid #b4b4b4;
    border-radius: 8px;
    box-shadow: none;
    color: #b4b4b4;
    margin: 5px;
  }

  .btn-add {
    background: #ffffff;
    border: 1px solid #00a3ff;
    border-radius: 2.5px;
    box-shadow: none;
    color: #00a3ff;
  }

  .btn-add:hover {
    background-color: #f3f3f3;
    border: 1px solid #00a3ff;
    color: #00a3ff;
  }

  .page-item {
    margin: 0 2px;
  }

  .page-link {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;
    width: 25px;
    border-radius: 4px !important;
    color: #00a3ff;
  }

  .page-item.active .page-link {
    background-color: #00a3ff !important;
    border: 1px solid #00a3ff;
  }

  .page-item.disabled .page-link {
    background-color: #ccc;
  }

  .pagination {
    margin: 0;
  }

  .dropdown-menu {
    font-size: 1em;
  }

  .dropdown-toggle {
    transition: all 0.3s;
  }

  .dropdown-menu form {
    padding: 5px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .dropdown-divider {
    margin: 0;
  }

  .dropdown-item {
    color: #495960 !important;
    font-size: 1em;
    padding: 3px 10px !important;
    margin: 0 !important;
  }

  .dropdown-item i {
    margin-right: 10px;
  }

  .input-flex {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    gap: 20px;
  }

  .input-flex label {
    margin: 0;
  }

  .nav-tabs {
    padding: 0 20px;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    flex-flow: nowrap;
  }

  .nav-link a {
    display: block;
    padding: 5px 30px;
    text-decoration: none;
  }

  .nav-link.active {
    font-weight: bold;
    color: #1a0473 !important;
  }

  .tab-content {
    padding: 30px 20px;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 61px;
    min-width: 61px;
    height: 34px;
    cursor: pointer;
  }

  .switch input {
    display: none;
  }

  .slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #adadad;
    border: 1px solid #adadad;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    content: "No";
    height: 28px;
    width: 28px;
    left: 2px;
    bottom: 2px;
    background-color: #fff;
    color: #adadad;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #fff;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    content: "Si";
    color: #fff;
    background: #00a3ff;
    transform: translateX(26px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  .input-radio input,
  .input-checkbox input {
    margin-right: 10px;
  }

  .modal-content-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    gap: 10px;
  }

  .rbt-close {
    border: none;
    margin-left: 5px;
    padding: 0 5px;
  }

  .rbt-input-wrapper {
    display: flex;
    flex-flow: row wrap;
    gap: 10px;
  }

  /*================= HEADER ==================*/

  .header {
    display: flex;
    width: 100%;
    height: 8vh;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background: #002f59;
  }

  .header-logo {
    height: 80%;
  }

  .header-user {
    display: flex;
    color: #aec3e1;
    justify-content: center;
    align-items: center;
    font-size: 1.1em;
    gap: 20px;
  }

  .header-user a {
    color: #aec3e1;
  }

  .header-user__bell {
    font-size: 1.5em;
    cursor: pointer;
  }

  .menu {
    background: #ffffff;
    box-shadow: 2px 0 3px rgba(0, 0, 0, 0.25);
    z-index: 999;
    font-size: 1.2em;
    color: #495960;
    padding: 30px 0;
    margin: 0;
  }

  .menu-section {
    width: 100%;
    margin: 5px 0;
    padding: 0 0 5px 0;
  }

  .menu-section__title {
    margin-left: 30px;
    padding: 10px 0;
    border-top: 1px solid #626262;
  }

  .menu-section__item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    color: #495960;
    padding: 10px 0 10px 9px;
    font-weight: bold;
    text-decoration: none;
  }

  .menu-section__item.active {
    color: #096fcb;
    border-left: 3px solid #002f59;
    background: #f1fafe;
  }

  .menu-section__item i {
    margin-right: 15px;
  }

  .menu-subsection {
    display: block;
    list-style: none;
    overflow: hidden;
    height: auto;
  }

  .menu-subsection__item {
    display: block;
    text-decoration: none;
    color: #495960;
    margin: 5px 5px 5px 30px;
  }

  .crumb {
    display: flex;
    height: 7vh;
    background: #044a88;
    align-items: center;
    padding: 0 20px;
    font-size: 1em;
    color: #dbe4f2;
    margin: 0;
  }

  .breadcrumb-item.active {
    color: #fff;
  }

  .header__menu {
    display: none;
    gap: 20px;
    transition: 0.3s;
    color: #aec3e1;
    align-items: center;
  }

  /*================ LOGIN ================*/

  .login {
    display: grid;
    grid-template-columns: 440px auto;
    background-color: #f1f8fd;
  }

  .login-side {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    padding: 50px 20px;
    background: linear-gradient(179.99deg, #020d27 0.01%, #0d5e8c 99.99%);
    box-shadow: 4px 0 4px rgba(0, 0, 0, 0.25);
    color: #ffffff;
  }

  .login-side h2 {
    text-align: right;
    font-size: 1.2em;
    margin-left: 110px;
    font-weight: 400;
  }

  .login-side-logo {
    width: 230px;
  }

  .login-side-subtract {
    position: absolute;
    width: 95%;
    left: 0;
    bottom: 0;
  }

  .login-form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
  }

  .login-footer {
    margin-top: 10px;
    color: #0a4972;
  }

  .form {
    display: flex;
    flex-direction: column;
    width: 360px;
    padding: 40px;
    background: #ffffff;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
  }

  /*===================== DASHBOARD ======================*/

  .dashboard {
    display: grid;
    grid-template-columns: 250px auto;
    height: 92vh;
  }

  .container-section {
    position: relative;
    width: auto;
    background: #ffffff;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    margin: 10px 20px;
    max-height: 81vh;
    overflow-y: auto;
    -ms-flex: 0 0 83.33333% !important;
    flex: 0 0 83.33333% !important;
    /* max-width: 83.33333%;*/
  }

  .container-section--max {
    height: 81vh;
  }

  .container-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fafbfc;
    border: 1px solid #dbe6e9;
    border-radius: 3px 3px 0 0;
    padding: 15px 20px;
    gap: 10px;
  }

  .container-header > span {
    font-size: 1.8em;
  }

  /*=================== REGISTERS =====================*/

  .register-container {
    display: grid;
    grid-template-columns: repeat(1, 2fr);
    grid-gap: 10px 20px;
    padding: 10px 20px 10px 20px;
    align-items: flex-start;
  }

  .container-buttons {
    display: flex;
    align-items: center;
    justify-content: end;
    background: #fafbfc;
    border: 1px solid #dbe6e9;
    border-radius: 0 0 3px 3px;
    padding: 10px 20px;
  }

  .register-results {
    grid-column: 1/3;
    overflow-x: auto;
  }

  .register-results__item {
    display: grid;
    justify-content: space-around;
    grid-template-columns: repeat(5, 1fr);
    border-bottom: 1px solid #dbe6e9;
    padding: 5px 0;
    margin: 0 20px;
  }

  .register-results__item span {
    margin-right: 20px;
  }

  .register-results__item span:first-child {
    font-weight: bold;
    font-size: 1.3em;
  }

  .register-results__item input {
    height: 13px;
  }

  .group-tags {
    display: flex;
    grid-column: 1/3;
    font-size: 0.9em;
    gap: 2px 10px;
    flex-flow: wrap row;
  }

  .group-tags__item {
    display: inline-flex;
    background: #c4c4c4;
    border: 1px solid #000;
    border-radius: 2px;
    padding-left: 15px;
    transition: 0.3s all;
  }

  .group-tags__item:hover {
    filter: brightness(90%);
  }

  .group-tags__item i {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e4d6d6;
    margin-left: 15px;
    padding: 0 5px;
    cursor: pointer;
  }

  /*=================== LISTS =====================*/

  .list-container {
    padding: 10px 20px;
    overflow-x: auto;
  }

  .table-head th {
    border-bottom: 3px solid #2196f3 !important;
  }

  .table input[type="checkbox"] {
    margin-right: 5px;
  }

  .table-item td:last-child div {
    display: inline;
    margin-left: 10px;
  }

  .table-item td:last-child a {
    padding: 0 5px;
  }

  .table-item--i {
    background-color: #f1fafe;
  }

  .list-container-filter {
    display: flex;
    gap: 5px 15px;
    flex-flow: row wrap;
    align-items: center;
    margin-bottom: 20px;
  }

  .list-container-filter select {
    border: 1px solid #50585c;
    border-radius: 2px;
    padding: 2px;
  }

  .list-container-filter input {
    margin-right: 5px;
  }

  /*================ ALERTS ===================*/

  .blur {
    filter: blur(8px);
  }

  .container-alerts {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.5);
    animation: opacity-in 0.15s linear forwards;
  }

  .alerts {
    position: relative;
    width: 1100px;
    background: #fff;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    padding: 15px;
    animation: transition-in 0.3s linear forwards;
  }

  .alerts__exit {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    width: 40px;
    height: 40px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25), 0 4px 4px rgba(0, 0, 0, 0.25);
    text-decoration: none;
    top: -15px;
    right: -15px;
    background: #fff;
    border: none;
    transition: background 0.3s;
  }

  .alerts__exit:hover {
    background: #eee;
  }

  .alerts-calendar {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .alerts-calendar > span {
    font-size: 2em;
  }

  .alerts-calendar-content {
    width: 250px;
    display: flex;
    flex-flow: column;
    height: 230px;
    overflow-y: auto;
  }

  .alerts-calendar-content span {
    font-size: 1.2em;
    margin: 5px 0;
  }

  .alerts-calendar-content h6 {
    text-align: center;
    font-weight: bold;
    color: #2196f3;
    font-size: 2em;
    margin: 10px 0;
  }

  .alerts-table {
    display: grid;
    grid-template-columns: 85% auto;
    width: 100%;
    gap: 5px 30px;
  }

  .alerts-header {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  .alerts-content {
    display: grid;
    grid-column: 1/2;
    grid-template-columns: repeat(7, 1fr);
  }

  .alerts-content__item {
    display: flex;
    flex-direction: column;
    border: 1px solid #eee;
    padding: 2px 5px 20px 5px;
  }

  .alerts-content__item.active {
    background: #ffbaba;
  }

  .alerts-content__item span {
    margin-bottom: 5px;
  }

  .alerts-content__item button {
    padding: 2px 10px;
    width: 110px;
    margin: 2px auto;
    text-align: left;
  }

  .alerts-filter {
    grid-column: 2/3;
    grid-row: 1/3;
    font-weight: bold;
  }

  .alerts-filter-section input {
    margin-right: 10px;
  }

  .alerts-filter-section:first-child {
    color: #002f59;
  }

  .alerts-filter-section:last-child {
    color: #ff5c00;
  }

  .alerts-filter-section div:first-child {
    display: flex;
    justify-content: space-between;
    color: #fff;
    padding: 2px 10px;
    font-weight: 400;
    margin-bottom: 20px;
    margin-top: 60px;
  }

  .alerts-filter-section:first-child div:first-child {
    background: #002f59;
  }

  .alerts-filter-section:last-child div:first-child {
    background: #ff5c00;
  }

  /*====================== GEOGRAPHIC ANALYSIS =======================*/

  .crumb-analysis {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 5px;
    color: #002f59;
    font-weight: bold;
  }

  .container-maps {
    display: grid;
    gap: 10px;
  }

  .container-maps img {
    width: 100%;
    height: 45vh;
    object-fit: cover;
  }

  .container-maps section {
    position: relative;
  }

  .container-submaps {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .container-submaps img {
    height: 34vh;
    width: 100%;
  }

  .container-maps__options {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    position: absolute;
    top: 0;
  }

  .container-maps__options div > button,
  .container-maps__options > a,
  .container-maps__options div > a {
    padding: 2px 10px;
  }

  .container-maps__options--bottom {
    bottom: 0;
    top: auto;
  }

  .buffer {
    background: rgba(255, 255, 255, 0.8);
    padding: 2px 20px;
    gap: 30px;
    color: #000;
    border-radius: 2px;
  }

  .buffer span:first-child {
    color: #ff0000;
    margin-right: 50px;
  }

  .dashboard-container {
    display: grid;
    grid-template-columns: 100% auto;
    overflow: hidden;
  }

  .container-section--grid {
    grid-column: 1/2;
  }

  .container-options {
    position: relative;
    background: #f1fafe;
    grid-row: 1/3;
    grid-column: 2/3;
  }

  .more-options-analysis {
    position: absolute;
    top: 100px;
    left: -14px;
    background: #00a3ff;
    border-radius: 3px 0 0 3px;
    color: #fff;
    padding: 2px 1px;
    font-size: 2em;
    cursor: pointer;
  }

  .options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px 20px;
    padding: 0 15px;
    height: 90vh;
    overflow-y: auto;
  }

  .options p {
    grid-column: 1/3;
    font-weight: bold;
    margin: 0;
    margin-top: 10px;
  }

  .options > span {
    grid-column: 1/3;
  }

  .options table {
    margin: 0;
  }

  .weather__item {
    display: grid;
    grid-template-columns: 50% 10% 40%;
    margin-bottom: 2px;
    align-items: center;
  }

  .options-buttons {
    display: flex;
    justify-content: space-around;
    gap: 5px;
    font-size: 2em;
    margin-top: 20px;
    flex-flow: row wrap;
  }

  .options-buttons a,
  .options-buttons label {
    min-width: 65px;
    padding: 2px 10px;
    border-radius: 20px;
  }

  .btn-zoom {
    min-width: auto;
  }

  .options-table {
    height: 200px;
    overflow: auto;
  }

  .options-table__body tr {
    cursor: pointer;
  }

  .options-table__body tr td:last-child a {
    margin-right: 20px;
  }

  /*================ CONTAINER PRINT =================*/

  .container-print {
    display: grid;
    grid-template-columns: 300px auto;
    margin: 0;
    height: 92vh;
  }

  .container-print-options {
    position: relative;
    background: #eef0ff;
    overflow-y: auto;
  }

  .container-print-options__title {
    display: flex;
    justify-content: space-between;
    background: #00a3ff;
    padding: 5px 10px;
    color: #fff;
  }

  .container-print-options > span {
    display: block;
    padding: 5px 15px;
    font-size: 1.3em;
    color: #6887f5;
  }

  .container-print-options > p {
    display: block;
    padding: 5px 15px;
    border-top: 1px dashed #495960;
    border-bottom: 1px dashed #495960;
    font-weight: bold;
    font-size: 1.1em;
    margin: 20px 0 !important;
  }

  .container-print-check {
    padding: 0 15px;
  }

  .container-print p {
    margin: 0;
  }

  .container-print .input-group {
    width: auto;
    margin: 0 15px;
  }

  .container-print__print {
    display: block;
    margin: 30px auto;
    margin-bottom: 10px;
  }

  .container-print-preview {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .section-print {
    position: relative;
    width: 470px;
    height: 640px;
    background: #ffffff;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    padding: 20px;
  }

  .section-print__logo {
    position: absolute;
    top: 20px;
    left: 17px;
    width: 45%;
  }

  .section-print__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .section-print__legend {
    position: absolute;
    bottom: 25px;
    right: 25px;
    width: 45%;
    height: 140px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 3px 3px 0 0;
  }

  .section-print__legend p {
    font-size: 2em;
  }

  .section-print__legend span {
    display: block;
    background: #40dd09;
    height: 5px;
    width: 100px;
    margin: 8px 0;
  }

  /*=================== SETTINGS =====================*/

  .container-tabs {
    margin-top: 10px;
  }

  .container-tab {
    display: grid;
    grid-template-columns: 50% auto;
    align-items: center;
    gap: 15px 10px;
  }

  .container-tab p {
    grid-column: 1/3;
    font-size: 1.4em;
    margin-bottom: 0;
    margin-top: 10px;
  }

  .container-tab span {
    grid-column: 1/3;
  }

  .container-tab .input-flex input {
    margin: 0;
  }

  .container-tab__table {
    grid-column: 1/3;
    overflow-x: auto;
  }

  .container-tab__footer {
    grid-column: 1/3;
    display: flex;
    justify-content: flex-end;
  }

  .container-tab__filter,
  .container-tab__buttons {
    display: flex;
    gap: 5px 10px;
    flex-flow: row wrap;
    align-items: center;
  }

  .container-tab__filter select {
    border: 1px solid #50585c;
    border-radius: 2px;
    padding: 2px;
  }

  .container-tab__filter input {
    margin-right: 5px;
  }

  .container-tab .dropdown-menu button {
    padding-left: 20px;
    padding-right: 20px;
  }

  /*================== ACTIVITIES =====================*/

  .register-container--activities {
    grid-template-columns: 100%;
  }

  /*================== TRACKING ====================*/

  .container-history {
    display: flex;
    flex-flow: column;
    align-content: center;
    gap: 10px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 2px;
    height: 69vh;
    overflow-y: auto;
  }

  .container-history__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .container-resume {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 2px;
    height: 69vh;
    overflow-y: auto;
  }

  .container-resume strong {
    display: block;
    margin-top: 10px;
    margin-bottom: 5px;
  }

  .container-resume > span {
    grid-column: 1/3;
  }

  .container-resume h6 {
    grid-column: 1/3;
    font-size: 1.4em;
    margin-bottom: 0;
    margin-top: 10px;
  }

  /*=================== RESPOSIVE ======================*/

  @media all and (max-width: 992px) {
    /*================ LOGIN ================*/
    .login {
      grid-template-columns: 360px auto;
    }

    .login-side h2 {
      font-size: 1.2em;
      margin-left: 20px;
    }

    /*=================== REGISTER =====================*/
    .register-container--send {
      grid-template-columns: 100%;
    }

    .register-results,
    .group-tags,
    .register-container--send p {
      grid-column: 1/2;
    }

    /*====================== ALERTS ======================*/
    .alerts {
      width: 95%;
      font-size: 0.9em;
      height: 90vh;
    }

    .alerts-table {
      grid-template-columns: auto;
      gap: 5px 20px;
      overflow-x: auto;
      height: 73vh;
    }

    .alerts-content__item {
      border: 1px solid #eee;
      padding: 1px 2px 20px 2px;
    }

    .alerts-content__item button {
      min-width: auto;
      width: 80px;
    }

    .alerts-filter {
      grid-column: 1/3;
      grid-row: 3/4;
    }

    .alerts-filter-section div:first-child {
      padding: 2px 10px;
      margin-bottom: 10px;
      margin-top: 15px;
    }

    .alerts-content {
      grid-column: 1/3;
    }

    .alerts-header {
      grid-column: 1/3;
    }
  }

  @media all and (max-width: 800px) {
    /*================ LOGIN ================*/
    .login {
      grid-template-columns: 200px auto;
    }

    .login-side-logo {
      width: 170px;
    }

    /*================= HEADER ==================*/
    .header__menu {
      display: flex;
      color: #aec3e1;
    }

    .header-user {
      display: none;
    }

    .menu {
      position: absolute;
      top: 0;
      left: 0;
      height: 92vh;
      width: 300px;
      transform: translateX(-98%);
    }

    /*===================== DASHBOARD ======================*/
    .dashboard {
      position: relative;
      grid-template-columns: 100%;
    }

    /*=================== SETTINGS =====================*/
    .container-tab__buttons {
      justify-content: flex-end;
      grid-column: 1/3;
    }

    .group-switchs,
    .container-tab .input-flex {
      grid-column: 1/3;
    }
  }

  @media all and (max-width: 576px) {
    /*================ LOGIN ================*/
    .login {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .login-form {
      position: absolute;
    }

    .form {
      width: 90%;
    }

    /*=================== REGISTER =====================*/
    .register-container {
      grid-template-columns: 100%;
    }

    .register-container p {
      grid-column: 1/2;
    }
  }

  .product-page .product-footer {
    box-shadow: 0 0 10px #363a41;
    position: fixed !important;
    padding-top: 15px;
    padding-top: 0.9375rem;
    padding-bottom: 15px;
    padding-bottom: 0.9375rem;
    z-index: 10;
    background: #fff;
    bottom: 0;
    left: 210.08px;
    left: 13.13rem;
    right: 0;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
  }

  @media (min-width: 768px) .justify-content-md-center {
    -ms-flex-pack: center !important;
    justify-content: center !important;
  }

  .labelrequired {
    color: red;
  }

  .container2 {
    width: 100% !important;
  }

  .form2 {
    display: block !important;
    margin-top: 0em !important;
  }

  element.style {
  }
  .col-form-label {
    /* padding-top: calc(.375rem + 1px); */
    /* padding-bottom: calc(.375rem + 1px); */
    /* margin-bottom: 0; */
    /* font-size: inherit; */
    /* line-height: 1.5; */
  }

  @media (min-width: 576px) .col-sm-2 {
    /* flex: 0 0 auto; */
    width: 16.66666667%;
  }

  /**/

  .footerproce {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;

    text-align: center;
    margin-left: 0px;

    align-items: center;
    background: #fafbfc;
    border: 1px solid #dbe6e9;
    border-radius: 3px 3px 0 0;
    padding: 15px 20px;
    gap: 10px;
  }

  .footerproce button {
    margin: 10px;
  }

  /*Tabla el alineamiento de las tablas */

  .table th {
    text-align: center;
  }

  .derecha {
    text-align: right;
  }

  .izquierda {
    text-align: left;
  }

  .centro {
    text-align: centro;
  }

  .btn-primary {
    min-width: 100px;
    background-color: #141a95;
    border-color: #141a95;
  }
  .btn-outline-primary {
    min-width: 100px;
    border-color: #000793;
  }
  .btn-primary:hover {
    background-color: #0f1473;
    border-color: #0f1473;
  }
  .btn100 {
    width: 100px;
  }

  .pagination > li > a,
  .pagination > li > span {
    position: relative;
    /* float: left; */
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #428bca;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid #ddd;
  }

  .pagination > li:first-child > a,
  .pagination > li:first-child > span {
    margin-left: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  .pagination li.active a,
  .pagination li.active a:focus,
  .pagination li.active a:hover {
    background: #5a5a5a;
    border-color: rgba(0, 0, 0, 0.2);
    box-shadow: inset 0 0 3px rgb(0 0 0 / 70%);
    color: #ffffff;
    -moz-box-shadow: 0 0 3px rgba(0, 0, 0, 0.7) inset;
    -webkit-box-shadow: 0 0 3px rgb(0 0 0 / 70%) inset;
  }
  .pagination {
    display: inline-block;
    padding-left: 0;
    margin: 20px 0;
    border-radius: 4px;
  }

  .pagination > li {
    display: inline;
  }

  .css-nvf14r-ToastContainer {
    z-index: 99998;
  }

  .react-confirm-alert-overlay {
    z-index: 99999 !important;
  }

  .react-confirm-alert {
    background: #fff !important;
    border: 1px solid #dbe6e9 !important;
    border-radius: 3px 3px 3px 3px !important;
    background-color: hsla(0, 0%, 100%, 0.85) !important;
    background-clip: padding-box !important;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%) !important;
    border-radius: 0.25rem !important;
  }
  .react-confirm-alert-body h1 {
    font-size: 16px;
    text-align: center;
    font-weight: bold;
    color: #002f59;
  }

  /*
background: #fafbfc;
border: 1px solid #dbe6e9;
border-radius: 3px 3px 0 0;
*/

  .react-confirm-alert-button-group {
    justify-content: center !important;
  }
  .react-confirm-alert-button-group > button {
    background-color: #002f59 !important;
  }
  .react-confirm-alert-overlay {
    background: rgba(0, 0, 0, 0.5) !important;
  }
  .modal-backdrop{
  background-color:rgba(0, 0, 0, 0.2) !important
  }
  
  /*=========Leaflet ===============*/
  
   .leaflet-pane,
    .leaflet-tile,
    .leaflet-marker-icon,
    .leaflet-marker-shadow,
    .leaflet-tile-container,
    .leaflet-pane > svg,
    .leaflet-pane > canvas,
    .leaflet-zoom-box,
    .leaflet-image-layer,
    .leaflet-layer {
      position: absolute;
      left: 0;
      top: 0;
    }
    .leaflet-container {
      overflow: hidden;
    }
    .leaflet-tile,
    .leaflet-marker-icon,
    .leaflet-marker-shadow {
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
      -webkit-user-drag: none;
    }
    /* Safari renders non-retina tile on retina better with this, but Chrome is worse */
    .leaflet-safari .leaflet-tile {
      image-rendering: -webkit-optimize-contrast;
    }
    /* hack that prevents hw layers "stretching" when loading new tiles */
    .leaflet-safari .leaflet-tile-container {
      width: 1600px;
      height: 1600px;
      -webkit-transform-origin: 0 0;
    }
    .leaflet-marker-icon,
    .leaflet-marker-shadow {
      display: block;
    }
    /* .leaflet-container svg: reset svg max-width decleration shipped in Joomla! (joomla.org) 3.x */
    /* .leaflet-container img: map is broken in FF if you have max-width: 100% on tiles */
    .leaflet-container .leaflet-overlay-pane svg,
    .leaflet-container .leaflet-marker-pane img,
    .leaflet-container .leaflet-shadow-pane img,
    .leaflet-container .leaflet-tile-pane img,
    .leaflet-container img.leaflet-image-layer {
      max-width: none !important;
    }

    .leaflet-container.leaflet-touch-zoom {
      -ms-touch-action: pan-x pan-y;
      touch-action: pan-x pan-y;
    }
    .leaflet-container.leaflet-touch-drag {
      -ms-touch-action: pinch-zoom;
    }
    .leaflet-container.leaflet-touch-drag.leaflet-touch-drag {
      -ms-touch-action: none;
      touch-action: none;
    }
    .leaflet-tile {
      filter: inherit;
      visibility: hidden;
    }
    .leaflet-tile-loaded {
      visibility: inherit;
    }
    .leaflet-zoom-box {
      width: 0;
      height: 0;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      z-index: 8;
    }
    /* workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=888319 */
    .leaflet-overlay-pane svg {
      -moz-user-select: none;
    }

    .leaflet-pane         { z-index: 4; }

    .leaflet-tile-pane    { z-index: 2; }
    .leaflet-overlay-pane { z-index: 4; }
    .leaflet-shadow-pane  { z-index: 5; }
    .leaflet-marker-pane  { z-index: 6; }
    .leaflet-tooltip-pane   { z-index: 7; }
    .leaflet-popup-pane   { z-index: 8; }

    .leaflet-map-pane canvas { z-index: 1; }
    .leaflet-map-pane svg    { z-index: 2; }

    .leaflet-vml-shape {
      width: 1px;
      height: 1px;
    }
    .lvml {
      behavior: url(#default#VML);
      display: inline-block;
      position: absolute;
    }


    /* control positioning */

    .leaflet-control {
      position: relative;
      z-index: 8;
      pointer-events: visiblePainted; /* IE 9-10 doesn't have auto */
      pointer-events: auto;
    }
    .leaflet-top,
    .leaflet-bottom {
      position: absolute;
      z-index: 8;
      pointer-events: none;
    }
    .leaflet-top {
      top: 0;
    }
    .leaflet-right {
      right: 0;
    }
    .leaflet-bottom {
      bottom: 0;
    }
    .leaflet-left {
      left: 0;
      z-index: 20;
    }
    .leaflet-control {
      float: left;
      clear: both;
    }
    .leaflet-right .leaflet-control {
      float: right;
    }
    .leaflet-top .leaflet-control {
      margin-top: 10px;
    }
    .leaflet-bottom .leaflet-control {
      margin-bottom: 10px;
    }
    .leaflet-left .leaflet-control {
      margin-left: 10px;
    }
    .leaflet-right .leaflet-control {
      margin-right: 10px;
    }


    /* zoom and fade animations */

    .leaflet-fade-anim .leaflet-tile {
      will-change: opacity;
    }
    .leaflet-fade-anim .leaflet-popup {
      opacity: 0;
      -webkit-transition: opacity 0.2s linear;
      -moz-transition: opacity 0.2s linear;
      -o-transition: opacity 0.2s linear;
      transition: opacity 0.2s linear;
    }
    .leaflet-fade-anim .leaflet-map-pane .leaflet-popup {
      opacity: 1;
    }
    .leaflet-zoom-animated {
      -webkit-transform-origin: 0 0;
      -ms-transform-origin: 0 0;
      transform-origin: 0 0;
    }
    .leaflet-zoom-anim .leaflet-zoom-animated {
      will-change: transform;
    }
    .leaflet-zoom-anim .leaflet-zoom-animated {
      -webkit-transition: -webkit-transform 0.25s cubic-bezier(0,0,0.25,1);
      -moz-transition:    -moz-transform 0.25s cubic-bezier(0,0,0.25,1);
      -o-transition:      -o-transform 0.25s cubic-bezier(0,0,0.25,1);
      transition:         transform 0.25s cubic-bezier(0,0,0.25,1);
    }
    .leaflet-zoom-anim .leaflet-tile,
    .leaflet-pan-anim .leaflet-tile {
      -webkit-transition: none;
      -moz-transition: none;
      -o-transition: none;
      transition: none;
    }

    .leaflet-zoom-anim .leaflet-zoom-hide {
      visibility: hidden;
    }


    /* cursors */

    .leaflet-interactive {
      cursor: pointer;
    }
    .leaflet-grab {
      cursor: -webkit-grab;
      cursor:    -moz-grab;
    }
    .leaflet-crosshair,
    .leaflet-crosshair .leaflet-interactive {
      cursor: crosshair;
    }
    .leaflet-popup-pane,
    .leaflet-control {
      cursor: auto;
    }
    .leaflet-dragging .leaflet-grab,
    .leaflet-dragging .leaflet-grab .leaflet-interactive,
    .leaflet-dragging .leaflet-marker-draggable {
      cursor: move;
      cursor: -webkit-grabbing;
      cursor:    -moz-grabbing;
    }

    /* marker & overlays interactivity */
    .leaflet-marker-icon,
    .leaflet-marker-shadow,
    .leaflet-image-layer,
    .leaflet-pane > svg path,
    .leaflet-tile-container {
      pointer-events: none;
    }

    .leaflet-marker-icon.leaflet-interactive,
    .leaflet-image-layer.leaflet-interactive,
    .leaflet-pane > svg path.leaflet-interactive {
      pointer-events: visiblePainted; /* IE 9-10 doesn't have auto */
      pointer-events: auto;
    }

    /* visual tweaks */

    .leaflet-container {
      background: #ddd;
      outline: 0;
    }
    .leaflet-container a {
      color: #2b82d4;
    }
    .leaflet-container a.leaflet-active {
      outline: 2px solid orange;
    }
    .leaflet-zoom-box {
      border: 2px dotted #38f;
      background: rgba(255,255,255,0.5);
    }


    /* general typography */
    .leaflet-container {
      font-family: "open sans";
      font-size: 11px;
    }


    /* general toolbar styles */

    .leaflet-bar {
      box-shadow: 0 1px 5px rgba(0,0,0,0.4);
      border-radius: 0px;
    }
    .leaflet-bar a,
    .leaflet-bar a:hover {
      background-color: #fff;
      width: 28px;
      height: 28px;
      line-height: 28px;
      display: block;
      text-align: center;
      text-decoration: none;
      color: black;
    }
    .leaflet-bar a,
    .leaflet-control-layers-toggle {
      background-position: 50% 50%;
      background-repeat: no-repeat;
      display: block;
    }
    .leaflet-bar a:hover {
      background-color: #f5f5f5;
    }
    .leaflet-bar a:first-child {
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
    }
    .leaflet-bar a:last-child {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
      border-bottom: none;
    }
    .leaflet-bar a.leaflet-disabled {
      cursor: default;
      background-color: #f5f5f5;
      color: #bbb;
    }

    .leaflet-touch .leaflet-bar a {
      width: 28px;
      height: 28px;
      line-height: 28px;
    }

    /* zoom control */

    .leaflet-control-zoom-in,
    .leaflet-control-zoom-out {
      font-family: "open sans";
      font-size: 18px;
    }
    .leaflet-control-zoom-out {
      font-size: 20px;
    }

    .leaflet-touch .leaflet-control-zoom-in {
      font-size: 22px;
    }
    .leaflet-touch .leaflet-control-zoom-out {
      font-size: 24px;
    }


    /* layers control */

    .leaflet-control-layers {
      box-shadow: 0 1px 5px rgba(0,0,0,0.4);
      background: #fff;
      border-radius: 5px;
    }
    .leaflet-control-layers-toggle {
      width: 36px;
      height: 36px;
    }
    .leaflet-retina .leaflet-control-layers-toggle {
    background-size: 26px 26px;
    }
    .leaflet-touch .leaflet-control-layers-toggle {
      width: 44px;
      height: 44px;
    }
    .leaflet-control-layers .leaflet-control-layers-list,
    .leaflet-control-layers-expanded .leaflet-control-layers-toggle {
      display: none;
    }
    .leaflet-control-layers-expanded .leaflet-control-layers-list {
      display: block;
      position: relative;
    }
    .leaflet-control-layers-expanded {
      padding: 6px 10px 6px 6px;
      color: #333;
      background: #fff;
    }
    .leaflet-control-layers-scrollbar {
      overflow-y: scroll;
      padding-right: 5px;
    }
    .leaflet-control-layers-selector {
      margin-top: 2px;
      position: relative;
      top: 1px;
    }
    .leaflet-control-layers label {
      display: block;
    }
    .leaflet-control-layers-separator {
      height: 0;
      border-top: 1px solid #ddd;
      margin: 5px -10px 5px -6px;
    }

    /* Default icon URLs */
    .leaflet-default-icon-path {
    background-image: url(images/marker-icon.png);
    }


    /* attribution and scale controls */

    .leaflet-container .leaflet-control-attribution {
      background: #fff;
      background: rgba(255, 255, 255, 0.7);
      margin: 0;
    }
    .leaflet-control-attribution,
    .leaflet-control-scale-line {
      padding: 0 5px;
      color: #333;
    }
    .leaflet-control-attribution a {
      text-decoration: none;
    }
    .leaflet-control-attribution a:hover {
      text-decoration: underline;
    }
    .leaflet-container .leaflet-control-attribution,
    .leaflet-container .leaflet-control-scale {
      font-size: 11px;
    }
    .leaflet-left .leaflet-control-scale {
      margin-left: 5px;
    }
    .leaflet-bottom .leaflet-control-scale {
      margin-bottom: 5px;
    }
    .leaflet-control-scale-line {
      border: 2px solid #777;
      border-top: none;
      line-height: 1.1;
      padding: 2px 5px 1px;
      font-size: 11px;
      white-space: nowrap;
      overflow: hidden;
      -moz-box-sizing: border-box;
      box-sizing: border-box;

      background: #fff;
      background: rgba(255, 255, 255, 0.5);
    }
    .leaflet-control-scale-line:not(:first-child) {
      border-top: 2px solid #777;
      border-bottom: none;
      margin-top: -2px;
    }
    .leaflet-control-scale-line:not(:first-child):not(:last-child) {
      border-bottom: 2px solid #777;
    }

    /* popup */

    .leaflet-popup {
      position: absolute;
      text-align: center;
    }
    .leaflet-popup-content-wrapper {
      padding: 1px;
      text-align: left;
      font-size: 11px;
    }
    .leaflet-popup-content {
      margin: 10px 20px 10px 10px;
      line-height: 14px;
    }
    .leaflet-popup-content p {
      margin: 18px 0;
    }
    .leaflet-popup-tip-container {
      margin: 0 auto;
      width: 40px;
      height: 20px;
      position: relative;
      overflow: hidden;
    }
    .leaflet-popup-tip {
      width: 17px;
      height: 17px;
      padding: 1px;

      margin: -10px auto 0;

      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      transform: rotate(45deg);
    }
    .leaflet-popup-content-wrapper,
    .leaflet-popup-tip {
      background: rgba(255,255,255,1);
      box-shadow: 0 1px 5px rgba(0,0,0,0.4);
    }
    .leaflet-container a.leaflet-popup-close-button {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 16px;
      height: 16px;
      overflow: hidden;
      text-indent: -50px;
      background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8cGF0aCBmaWxsPSIjNkY2RjZGIiBkPSJNNDI3LjE4MiwxMC4zODhMMjY2Ljc3NSwxNzEuMDEzYy01LjY2Myw1LjY2OS0xMy4yMTcsNS42NzQtMTguODg2LDAuMDEzTDg3LjI2NSwxMC42MTkKCUM3NS45MjgtMC43MDUsNjAuODE5LTAuNjkzLDQ5LjQ5OSwxMC42NDNMMTEuNzU1LDQ4LjQzN0MwLjQzMiw1OS43NzYsMC40NDIsNzQuODgzLDExLjc4LDg2LjIwNmwxNjAuNjI1LDE2MC40MDcKCWM1LjY2OSw1LjY2MSw1LjY3NCwxMy4yMTUsMC4wMTMsMTguODg0TDEyLjAwOSw0MjYuMTIzYy0xMS4zMjIsMTEuMzM3LTExLjMxMiwyNi40NDYsMC4wMjcsMzcuNzY4bDM3Ljc5NCwzNy43NDUKCWMxMS4zMzgsMTEuMzIyLDI2LjQ0NCwxMS4zMTEsMzcuNzY3LTAuMDI3bDE2MC40MDgtMTYwLjYyNWM1LjY2Mi01LjY2OCwxMy4yMTYtNS42NzMsMTguODg2LTAuMDExTDQyNy41MTQsNTAxLjM4CgljMTEuMzM5LDExLjMyMywyNi40NDYsMTEuMzEyLDM3Ljc2OS0wLjAyNWwzNy43NDMtMzcuNzk1YzExLjMyMS0xMS4zMzcsMTEuMzEzLTI2LjQ0NC0wLjAyNi0zNy43NjdMMzQyLjM3NSwyNjUuMzg2CgljLTUuNjY5LTUuNjYxLTUuNjczLTEzLjIxOC0wLjAxNC0xOC44ODZMNTAyLjc3LDg1Ljg3NWMxMS4zMjItMTEuMzM5LDExLjMxMy0yNi40NDUtMC4wMjQtMzcuNzY4bC0zNy43OTYtMzcuNzQzCglDNDUzLjYxMy0wLjk2LDQzOC41MDUtMC45NSw0MjcuMTgyLDEwLjM4OHoiLz4KPC9zdmc+Cg==') center center no-repeat;
      background-size: 10px 10px;
    }
    .leaflet-container a.leaflet-popup-close-button:hover {
      color: #999;
    }
    .leaflet-popup-scrolled {
      overflow: auto;
      border-bottom: 1px solid #ddd;
      border-top: 1px solid #ddd;
    }

    .leaflet-oldie .leaflet-popup-content-wrapper {
      zoom: 1;
    }
    .leaflet-oldie .leaflet-popup-tip {
      width: 24px;
      margin: 0 auto;

      -ms-filter: "progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)";
      filter: progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678);
    }
    .leaflet-oldie .leaflet-popup-tip-container {
      margin-top: -1px;
    }

    .leaflet-oldie .leaflet-control-zoom,
    .leaflet-oldie .leaflet-control-layers,
    .leaflet-oldie .leaflet-popup-content-wrapper,
    .leaflet-oldie .leaflet-popup-tip {
      border: 1px solid #999;
    }

    /* div icon */

    .leaflet-div-icon {
      background: #fff;
      border: 1px solid #666;
    }


    /* Tooltip */
    /* Base styles for the element that has a tooltip */
    .leaflet-tooltip {
      position: absolute;
      padding: 3px;
      background-color: #fff;
      border: 1px solid #fff;
      color: #222;
      white-space: nowrap;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      pointer-events: none;
      box-shadow: 0 1px 5px rgba(0,0,0,0.4);
    }
    .leaflet-tooltip.leaflet-clickable {
      cursor: pointer;
      pointer-events: auto;
    }
    .leaflet-tooltip-top:before,
    .leaflet-tooltip-bottom:before,
    .leaflet-tooltip-left:before,
    .leaflet-tooltip-right:before {
      position: absolute;
      pointer-events: none;
      border: 6px solid transparent;
      background: transparent;
      content: "";
    }

    /* Directions */

    .leaflet-tooltip-bottom {
      margin-top: 6px;
    }
    .leaflet-tooltip-top {
      margin-top: -6px;
    }
    .leaflet-tooltip-bottom:before,
    .leaflet-tooltip-top:before {
      left: 50%;
      margin-left: -6px;
    }
    .leaflet-tooltip-top:before {
      bottom: 0;
      margin-bottom: -12px;
      border-top-color: #fff;
    }
    .leaflet-tooltip-bottom:before {
      top: 0;
      margin-top: -12px;
      margin-left: -6px;
      border-bottom-color: #fff;
    }
    .leaflet-tooltip-left {
      margin-left: -6px;
    }
    .leaflet-tooltip-right {
      margin-left: 6px;
    }
    .leaflet-tooltip-left:before,
    .leaflet-tooltip-right:before {
      top: 50%;
      margin-top: -6px;
    }
    .leaflet-tooltip-left:before {
      right: 0;
      margin-right: -12px;
      border-left-color: #fff;
    }
    .leaflet-tooltip-right:before {
      left: 0;
      margin-left: -12px;
      border-right-color: #fff;
    }
    /*======Fin leaflet======*/
    
    /*=======Wizard========*/
    
    
#progressbar {
    margin-bottom: 30px;
    overflow: hidden;
    color: lightgrey
}

#progressbar .active {
    color: #000000
}

#progressbar li {
    list-style-type: none;
    font-size: 12px;
    width: 25%;
    float: left;
    position: relative
}

#progressbar #account:before {
    font-family: FontAwesome;
    content: "\\f023"
}

#progressbar #personal:before {
    font-family: FontAwesome;
    content: "\\f007"
}

#progressbar #payment:before {
    font-family: FontAwesome;
    content: "\\f09d"
}

#progressbar #confirm:before {
    font-family: FontAwesome;
    content: "\\f00c"
}

#progressbar li:before {
    width: 50px;
    height: 50px;
    line-height: 45px;
    display: block;
    font-size: 18px;
    color: #ffffff;
    background: lightgray;
    border-radius: 50%;
    margin: 0 auto 10px auto;
    padding: 2px
}




#msform {
    text-align: center;
    position: relative;
    margin-top: 20px
}

#msform fieldset .form-card {
    background: white;
    border: 0 none;
    border-radius: 0px;
    box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.2);
    padding: 20px 40px 30px 40px;
    box-sizing: border-box;
    width: 94%;
    margin: 0 3% 20px 3%;
    position: relative
}

#msform fieldset {
    background: white;
    border: 0 none;
    border-radius: 0.5rem;
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding-bottom: 20px;
    position: relative
}

#msform fieldset:not(:first-of-type) {
    display: none
}

#msform fieldset .form-card {
    text-align: left;
    color: #9E9E9E
}

#msform input,
#msform textarea {
    padding: 0px 8px 4px 8px;
    border: none;
    border-bottom: 1px solid #ccc;
    border-radius: 0px;
    margin-bottom: 25px;
    margin-top: 2px;
    width: 100%;
    box-sizing: border-box;
    font-family: montserrat;
    color: #2C3E50;
    font-size: 16px;
    letter-spacing: 1px
}

#msform input:focus,
#msform textarea:focus {
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    border: none;
    font-weight: bold;
    border-bottom: 2px solid skyblue;
    outline-width: 0
}

#msform .action-button {
    width: 100px;
    background: skyblue;
    font-weight: bold;
    color: white;
    border: 0 none;
    border-radius: 0px;
    cursor: pointer;
    padding: 10px 5px;
    margin: 10px 5px
}



#progressbar {
    margin-bottom: 30px;
    overflow: hidden;
    color: lightgrey
}

#progressbar .active {
    color: #000000
}

#progressbar li {
    list-style-type: none;
    font-size: 12px;
    width: 25%;
    float: left;
    position: relative
}

#progressbar #account:before {
    font-family: FontAwesome;
    content: "1";
     
}

#progressbar #personal:before {
    font-family: FontAwesome;
    content: "2"
}

#progressbar #payment:before {
    font-family: FontAwesome;
    content: "3"
}

#progressbar #confirm:before {
    font-family: FontAwesome;
    content: "\\f00c"
}

#progressbar li:before {
    width: 50px;
    height: 50px;
    line-height: 45px;
    display: block;
    font-size: 18px;
    color: #ffffff;
    background: lightgray;
    border-radius: 50%;
    margin: 0 auto 10px auto;
    padding: 2px;
  
}

#progressbar li:after {
    content: '' !important;
    width: 100% !important;
    height: 3px !important;
    background: lightgray ;
    position: absolute !important;
    left: 0 !important;
    top: 25px !important;
    z-index: 0 !important;
}

#progressbar li.active:before,
#progressbar li.active:after {
    background: skyblue
}


.form-select{
border: 1px solid #16293c;
}

/*¡¡¡¡¡¡loadging*/
.logo{
    width: 52px;
    height: 52px;
}
.loading-scr{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background: #f5f5f5;
}
.load-bar{
    width: 150px;
    height: 2px;
    position: relative;
    overflow: hidden;
    background: #cfcfcf;
    margin-top: 22px;
}
.load-bar::before{
    content: "";
    width: 75px;
    height: 2px;
    position: absolute;
    left: -34px;
    background: #0073b1;  
    animation: loadBar 1.5s infinite ease;
}
.image-logo-loading{
 height: 300px;
}
/*-- load bar animation CSS--*/
@keyframes loadBar {
    50%{
        left: 100px;
    }
}

.crumb-analysis span{
color: #ffffff;
}

/**/
.center-parent {

  text-align: center;
}
.center-child {
   display: inline-block;
}

`;

export default createGlobalStyle`${baseStyles}}`;
