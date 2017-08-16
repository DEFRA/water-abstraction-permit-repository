--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.3
-- Dumped by pg_dump version 9.6.3

-- Started on 2017-08-14 08:50:05 BST



SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = pg_catalog;

DROP SCHEMA IF EXISTS permit CASCADE;
CREATE SCHEMA permit;
set schema 'permit';
SET default_tablespace = '';
SET default_with_oids = false;

--
-- TOC entry 194 (class 1259 OID 24613)
-- Name: field; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE field (
    field_nm character varying,
    field_definition json,
    field_active bit(1),
    field_id bigint NOT NULL,
    field_is_search_key bit(1)
);


ALTER TABLE field OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 24668)
-- Name: field_fieldID_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "field_fieldID_seq1"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "field_fieldID_seq1" OWNER TO postgres;

--
-- TOC entry 2519 (class 0 OID 0)
-- Dependencies: 199
-- Name: field_fieldID_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "field_fieldID_seq1" OWNED BY field.field_id;


--
-- TOC entry 188 (class 1259 OID 24576)
-- Name: licence; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE licence (
    licence_ref_2 character varying(255),
    licence_status_id bigint,
    licence_type_id bigint NOT NULL,
    licence_org_id bigint NOT NULL,
    licence_id bigint NOT NULL,
    licence_search_key text,
    is_public_domain bit(1),
    licence_start_dt date,
    licence_end_dt date,
    licence_ref character varying
);


ALTER TABLE licence OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 24661)
-- Name: licence_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE licence_data (
    licence_id bigint NOT NULL,
    licence_data_value text,
    type_fields_id bigint,
    licence_data_id bigint NOT NULL
);


ALTER TABLE licence_data OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 24694)
-- Name: licence_data_licence_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE licence_data_licence_data_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE licence_data_licence_data_id_seq OWNER TO postgres;

--
-- TOC entry 2520 (class 0 OID 0)
-- Dependencies: 201
-- Name: licence_data_licence_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE licence_data_licence_data_id_seq OWNED BY licence_data.licence_data_id;


--
-- TOC entry 196 (class 1259 OID 24630)
-- Name: licence_licenceID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "licence_licenceID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "licence_licenceID_seq" OWNER TO postgres;

--
-- TOC entry 2521 (class 0 OID 0)
-- Dependencies: 196
-- Name: licence_licenceID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "licence_licenceID_seq" OWNED BY licence.licence_id;


--
-- TOC entry 193 (class 1259 OID 24604)
-- Name: org; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE org (
    org_nm character varying,
    org_id bigint NOT NULL
);


ALTER TABLE org OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 24643)
-- Name: org_orgID_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "org_orgID_seq1"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "org_orgID_seq1" OWNER TO postgres;

--
-- TOC entry 2522 (class 0 OID 0)
-- Dependencies: 197
-- Name: org_orgID_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "org_orgID_seq1" OWNED BY org.org_id;


--
-- TOC entry 190 (class 1259 OID 24586)
-- Name: status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE status (
    status_id integer NOT NULL,
    status_nm character varying(30)[],
    status_active bit(1)[]
);


ALTER TABLE status OWNER TO postgres;

--
-- TOC entry 189 (class 1259 OID 24584)
-- Name: status_statusID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "status_statusID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "status_statusID_seq" OWNER TO postgres;

--
-- TOC entry 2523 (class 0 OID 0)
-- Dependencies: 189
-- Name: status_statusID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "status_statusID_seq" OWNED BY status.status_id;


--
-- TOC entry 192 (class 1259 OID 24595)
-- Name: type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE type (
    type_id integer NOT NULL,
    type_nm character varying,
    org_id bigint
);


ALTER TABLE type OWNER TO postgres;

--
-- TOC entry 195 (class 1259 OID 24624)
-- Name: type_fields; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE type_fields (
    type_id bigint NOT NULL,
    field_id bigint NOT NULL,
    type_fields_id bigint NOT NULL,
    is_required bit(1),
    is_public_domain bit(1),
    type_field_alias character varying
);


ALTER TABLE type_fields OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 24680)
-- Name: typeFields_typeFieldsID_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "typeFields_typeFieldsID_seq1"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "typeFields_typeFieldsID_seq1" OWNER TO postgres;

--
-- TOC entry 2524 (class 0 OID 0)
-- Dependencies: 200
-- Name: typeFields_typeFieldsID_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "typeFields_typeFieldsID_seq1" OWNED BY type_fields.type_fields_id;


--
-- TOC entry 191 (class 1259 OID 24593)
-- Name: type_typeID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "type_typeID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "type_typeID_seq" OWNER TO postgres;

--
-- TOC entry 2525 (class 0 OID 0)
-- Dependencies: 191
-- Name: type_typeID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "type_typeID_seq" OWNED BY type.type_id;


--
-- TOC entry 2359 (class 2604 OID 24670)
-- Name: field field_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY field ALTER COLUMN field_id SET DEFAULT nextval('"field_fieldID_seq1"'::regclass);


--
-- TOC entry 2355 (class 2604 OID 24632)
-- Name: licence licence_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY licence ALTER COLUMN licence_id SET DEFAULT nextval('"licence_licenceID_seq"'::regclass);


--
-- TOC entry 2361 (class 2604 OID 24696)
-- Name: licence_data licence_data_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY licence_data ALTER COLUMN licence_data_id SET DEFAULT nextval('licence_data_licence_data_id_seq'::regclass);


--
-- TOC entry 2358 (class 2604 OID 24645)
-- Name: org org_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY org ALTER COLUMN org_id SET DEFAULT nextval('"org_orgID_seq1"'::regclass);


--
-- TOC entry 2356 (class 2604 OID 24589)
-- Name: status status_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY status ALTER COLUMN status_id SET DEFAULT nextval('"status_statusID_seq"'::regclass);


--
-- TOC entry 2357 (class 2604 OID 24598)
-- Name: type type_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY type ALTER COLUMN type_id SET DEFAULT nextval('"type_typeID_seq"'::regclass);


--
-- TOC entry 2360 (class 2604 OID 24682)
-- Name: type_fields type_fields_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY type_fields ALTER COLUMN type_fields_id SET DEFAULT nextval('"typeFields_typeFieldsID_seq1"'::regclass);


--
-- TOC entry 2505 (class 0 OID 24613)
-- Dependencies: 194
-- Data for Name: field; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO field VALUES ('DateField', '{"type":"date"}', B'1', 17, NULL);
INSERT INTO field VALUES ('NumberField', '{"type":"number"}', B'1', 18, NULL);
INSERT INTO field VALUES ('IntField', '{"type":"int"}', B'1', 19, NULL);
INSERT INTO field VALUES ('TextField', '{"type":"text"}', B'1', 20, NULL);
INSERT INTO field VALUES ('ArrayField', '{"type":"array"}', B'1', 21, NULL);


--
-- TOC entry 2526 (class 0 OID 0)
-- Dependencies: 199
-- Name: field_fieldID_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"field_fieldID_seq1"', 21, true);


--
-- TOC entry 2499 (class 0 OID 24576)
-- Dependencies: 188
-- Data for Name: licence; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO licence VALUES (NULL, 1, 1, 1, 49, '|Albert Portswiggler|A hole|When it is wet,when it is damp|Lots|Mr Licence Holder|Alberts House, Near the hole, Somewhere|999|albert@portswiggler.com|Fun|Drinking Straw|A cup|A collection of mid 80s vinyl|2017/01/01|2028/01/01|Tap|First 26 seconds of every hour, every other Thursday in June|[object Object]', NULL, '2017-01-01', '2018-01-01', 'test licence 6');


--
-- TOC entry 2509 (class 0 OID 24661)
-- Dependencies: 198
-- Data for Name: licence_data; Type: TABLE DATA; Schema: public; Owner: postgres
--


INSERT INTO licence_data VALUES (49, '"Albert Portswiggler"', 1, 559);
INSERT INTO licence_data VALUES (49, '"A hole"', 3, 560);
INSERT INTO licence_data VALUES (49, '["When it is wet","when it is damp"]', 4, 561);
INSERT INTO licence_data VALUES (49, '"Lots"', 5, 562);
INSERT INTO licence_data VALUES (49, '"Mr Licence Holder"', 6, 563);
INSERT INTO licence_data VALUES (49, '"Alberts House, Near the hole, Somewhere"', 7, 564);
INSERT INTO licence_data VALUES (49, '"999"', 8, 565);
INSERT INTO licence_data VALUES (49, '"albert@portswiggler.com"', 9, 566);
INSERT INTO licence_data VALUES (49, '"Fun"', 10, 567);
INSERT INTO licence_data VALUES (49, '"Drinking Straw"', 11, 568);
INSERT INTO licence_data VALUES (49, '"A cup"', 12, 569);
INSERT INTO licence_data VALUES (49, '"A collection of mid 80s vinyl"', 13, 570);
INSERT INTO licence_data VALUES (49, '"2017/01/01"', 14, 571);
INSERT INTO licence_data VALUES (49, '"2028/01/01"', 15, 572);
INSERT INTO licence_data VALUES (49, '"Tap"', 16, 573);
INSERT INTO licence_data VALUES (49, '"First 26 seconds of every hour, every other Thursday in June"', 17, 574);
INSERT INTO licence_data VALUES (49, '[{"type":"21","subtype":"3","attributes":{"ngr":"abcde123","point_ref":"678"}}]', 18, 575);


--
-- TOC entry 2527 (class 0 OID 0)
-- Dependencies: 201
-- Name: licence_data_licence_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('licence_data_licence_data_id_seq', 575, true);


--
-- TOC entry 2528 (class 0 OID 0)
-- Dependencies: 196
-- Name: licence_licenceID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"licence_licenceID_seq"', 49, true);


--
-- TOC entry 2504 (class 0 OID 24604)
-- Dependencies: 193
-- Data for Name: org; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO org VALUES ('Water Licencing', 1);
INSERT INTO org VALUES ('Waste Management', 2);
INSERT INTO org VALUES ('Fish Licencing', 3);
INSERT INTO org VALUES ('Dog Licencing', 4);


--
-- TOC entry 2529 (class 0 OID 0)
-- Dependencies: 197
-- Name: org_orgID_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"org_orgID_seq1"', 4, true);


--
-- TOC entry 2501 (class 0 OID 24586)
-- Dependencies: 190
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO status VALUES (1, '{Active}', '{1}');


--
-- TOC entry 2530 (class 0 OID 0)
-- Dependencies: 189
-- Name: status_statusID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"status_statusID_seq"', 1, true);


--
-- TOC entry 2503 (class 0 OID 24595)
-- Dependencies: 192
-- Data for Name: type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO type VALUES (1, 'Abstraction Licence', 1);
INSERT INTO type VALUES (2, 'Example Licence Type', 1);
INSERT INTO type VALUES (3, 'Dog Licence Type', 3);


--
-- TOC entry 2531 (class 0 OID 0)
-- Dependencies: 200
-- Name: typeFields_typeFieldsID_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"typeFields_typeFieldsID_seq1"', 18, true);


--
-- TOC entry 2506 (class 0 OID 24624)
-- Dependencies: 195
-- Data for Name: type_fields; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO type_fields VALUES (1, 21, 4, B'1', NULL, 'FlowConditions');
INSERT INTO type_fields VALUES (1, 21, 18, B'0', B'1', 'SourceOfSupplyTest');
INSERT INTO type_fields VALUES (1, 20, 13, B'1', NULL, 'Records');
INSERT INTO type_fields VALUES (1, 20, 12, B'1', NULL, 'MeansOfMeasurement');
INSERT INTO type_fields VALUES (1, 20, 15, B'1', NULL, 'LicenceEffectiveTo');
INSERT INTO type_fields VALUES (1, 20, 14, B'1', NULL, 'LicenceEffectiveFrom');
INSERT INTO type_fields VALUES (1, 20, 17, B'1', NULL, 'PeriodOfAbstraction');
INSERT INTO type_fields VALUES (1, 20, 16, B'1', NULL, 'SourceOfSupply');
INSERT INTO type_fields VALUES (1, 20, 3, B'1', NULL, 'PointOfAbstraction');
INSERT INTO type_fields VALUES (1, 20, 1, B'1', NULL, 'LicenceHolder');
INSERT INTO type_fields VALUES (1, 20, 5, B'1', NULL, 'MaximumQuantities');
INSERT INTO type_fields VALUES (1, 20, 7, B'1', NULL, 'LicenceHolderAddress');
INSERT INTO type_fields VALUES (1, 20, 6, B'1', NULL, 'LicenceHolderName');
INSERT INTO type_fields VALUES (1, 20, 9, B'1', NULL, 'LicenceHolderEmail');
INSERT INTO type_fields VALUES (1, 20, 8, B'1', NULL, 'LicenceHolderTelephone');
INSERT INTO type_fields VALUES (1, 20, 11, B'1', NULL, 'MeansOfAbstraction');
INSERT INTO type_fields VALUES (1, 20, 10, B'1', NULL, 'PurposeOfAbstraction');


--
-- TOC entry 2532 (class 0 OID 0)
-- Dependencies: 191
-- Name: type_typeID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"type_typeID_seq"', 2, true);


--
-- TOC entry 2371 (class 2606 OID 24679)
-- Name: field fieldID; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY field
    ADD CONSTRAINT "fieldID" PRIMARY KEY (field_id);


--
-- TOC entry 2363 (class 2606 OID 24691)
-- Name: licence licenceID; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY licence
    ADD CONSTRAINT "licenceID" PRIMARY KEY (licence_id);


--
-- TOC entry 2375 (class 2606 OID 24706)
-- Name: licence_data licence_data_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY licence_data
    ADD CONSTRAINT licence_data_id PRIMARY KEY (licence_data_id);


--
-- TOC entry 2369 (class 2606 OID 24654)
-- Name: org orgID; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY org
    ADD CONSTRAINT "orgID" PRIMARY KEY (org_id);


--
-- TOC entry 2365 (class 2606 OID 24656)
-- Name: status statusID; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY status
    ADD CONSTRAINT "statusID" PRIMARY KEY (status_id);


--
-- TOC entry 2373 (class 2606 OID 24688)
-- Name: type_fields typeFieldsID; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY type_fields
    ADD CONSTRAINT "typeFieldsID" PRIMARY KEY (type_fields_id) DEFERRABLE;


--
-- TOC entry 2367 (class 2606 OID 24658)
-- Name: type typeID; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY type
    ADD CONSTRAINT "typeID" PRIMARY KEY (type_id);


--
-- TOC entry 2380 (class 2606 OID 32832)
-- Name: type_fields field_id_constraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY type_fields
    ADD CONSTRAINT field_id_constraint FOREIGN KEY (field_id) REFERENCES field(field_id);


--
-- TOC entry 2381 (class 2606 OID 32807)
-- Name: licence_data licence_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY licence_data
    ADD CONSTRAINT licence_id FOREIGN KEY (licence_id) REFERENCES licence(licence_id);


--
-- TOC entry 2376 (class 2606 OID 32812)
-- Name: licence org_id_constraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY licence
    ADD CONSTRAINT org_id_constraint FOREIGN KEY (licence_org_id) REFERENCES org(org_id);


--
-- TOC entry 2377 (class 2606 OID 32817)
-- Name: licence type_id_constraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY licence
    ADD CONSTRAINT type_id_constraint FOREIGN KEY (licence_type_id) REFERENCES type(type_id);


--
-- TOC entry 2379 (class 2606 OID 32827)
-- Name: type_fields type_id_constraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY type_fields
    ADD CONSTRAINT type_id_constraint FOREIGN KEY (type_id) REFERENCES type(type_id);


--
-- TOC entry 2378 (class 2606 OID 32822)
-- Name: type type_org_id_constraint; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY type
    ADD CONSTRAINT type_org_id_constraint FOREIGN KEY (org_id) REFERENCES org(org_id);


--
-- TOC entry 2518 (class 0 OID 0)
-- Dependencies: 10
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2017-08-14 08:50:06 BST

--
-- PostgreSQL database dump complete
--
