--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8
-- Dumped by pg_dump version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: defensas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.defensas (
    id integer NOT NULL,
    defensa character varying(45) NOT NULL
);


ALTER TABLE public.defensas OWNER TO postgres;

--
-- Name: defensas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.defensas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.defensas_id_seq OWNER TO postgres;

--
-- Name: defensas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.defensas_id_seq OWNED BY public.defensas.id;


--
-- Name: diplomacias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.diplomacias (
    id_reino_1 integer NOT NULL,
    id_reino_2 integer NOT NULL,
    es_aliado boolean NOT NULL
);


ALTER TABLE public.diplomacias OWNER TO postgres;

--
-- Name: karts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.karts (
    id integer NOT NULL,
    modelo character varying(45) NOT NULL,
    color character varying(45) NOT NULL,
    velocidad_maxima integer,
    id_personaje integer NOT NULL
);


ALTER TABLE public.karts OWNER TO postgres;

--
-- Name: karts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.karts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.karts_id_seq OWNER TO postgres;

--
-- Name: karts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.karts_id_seq OWNED BY public.karts.id;


--
-- Name: personaje_habita_reino; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.personaje_habita_reino (
    id_personaje integer NOT NULL,
    id_reino integer NOT NULL,
    fecha_registro timestamp(3) without time zone NOT NULL,
    es_gobernante boolean NOT NULL
);


ALTER TABLE public.personaje_habita_reino OWNER TO postgres;

--
-- Name: personaje_tiene_trabajo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.personaje_tiene_trabajo (
    id_personaje integer NOT NULL,
    id_trabajo integer NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_termino date
);


ALTER TABLE public.personaje_tiene_trabajo OWNER TO postgres;

--
-- Name: personajes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.personajes (
    id integer NOT NULL,
    nombre text NOT NULL,
    fuerza integer NOT NULL,
    fecha_nacimiento date NOT NULL,
    objeto text
);


ALTER TABLE public.personajes OWNER TO postgres;

--
-- Name: personajes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.personajes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.personajes_id_seq OWNER TO postgres;

--
-- Name: personajes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.personajes_id_seq OWNED BY public.personajes.id;


--
-- Name: reino_defensas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reino_defensas (
    "reinoId" integer NOT NULL,
    "defensaId" integer NOT NULL
);


ALTER TABLE public.reino_defensas OWNER TO postgres;

--
-- Name: reinos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reinos (
    id integer NOT NULL,
    nombre character varying(45) NOT NULL,
    ubicacion character varying(45) NOT NULL,
    superficie integer NOT NULL
);


ALTER TABLE public.reinos OWNER TO postgres;

--
-- Name: reinos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reinos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reinos_id_seq OWNER TO postgres;

--
-- Name: reinos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reinos_id_seq OWNED BY public.reinos.id;


--
-- Name: trabajos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trabajos (
    id integer NOT NULL,
    descripcion character varying(45) NOT NULL,
    sueldo integer NOT NULL
);


ALTER TABLE public.trabajos OWNER TO postgres;

--
-- Name: trabajos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.trabajos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.trabajos_id_seq OWNER TO postgres;

--
-- Name: trabajos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.trabajos_id_seq OWNED BY public.trabajos.id;


--
-- Name: defensas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.defensas ALTER COLUMN id SET DEFAULT nextval('public.defensas_id_seq'::regclass);


--
-- Name: karts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.karts ALTER COLUMN id SET DEFAULT nextval('public.karts_id_seq'::regclass);


--
-- Name: personajes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personajes ALTER COLUMN id SET DEFAULT nextval('public.personajes_id_seq'::regclass);


--
-- Name: reinos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reinos ALTER COLUMN id SET DEFAULT nextval('public.reinos_id_seq'::regclass);


--
-- Name: trabajos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trabajos ALTER COLUMN id SET DEFAULT nextval('public.trabajos_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
1fe2419e-ff6c-4196-baf0-8b593f5e7896	00e51d320c4aee31ce5b72606fbe8d299dafb57100f5a5d651a551cddb30a1c6	2023-06-04 06:06:39.317701+00	20230527211852_first	\N	\N	2023-06-04 06:06:38.60171+00	1
1b9341ce-bbb6-4169-bf2c-b87635a22c97	3f2f94def36c28a3fb66af3b00c19cafb4fbad5666675be07449666185d504a9	2023-06-04 06:06:40.457595+00	20230527213205_second	\N	\N	2023-06-04 06:06:39.610439+00	1
8d2e3a48-8dad-4f47-9684-042e2566466e	766dc12f855819ce2f8df260d4ee9c7e6e5ef18d1741d8bb65d13085a62feb29	2023-06-04 06:06:41.43756+00	20230527224122_third	\N	\N	2023-06-04 06:06:40.741831+00	1
6c82bd64-ed11-43f6-b9e6-86e9888d30d1	ee3a288316b232f27115b06edfe6c2d5acaee3883426646c848f0813cb88211d	2023-06-04 06:06:42.37818+00	20230527224219_fourth	\N	\N	2023-06-04 06:06:41.684708+00	1
df98cb1c-7e75-44b2-8800-dece4f3d3e44	f65033c93ad574eb5a0e685bdbe07fcfc6613b2ed9b987fd38e4ac09a9b05d20	2023-06-04 06:06:43.475393+00	20230604055347_fix	\N	\N	2023-06-04 06:06:42.697768+00	1
da01fb70-de9d-4788-9c33-442c0cc879cd	f327e36cd957fe3365b2fa8dc02869504b67b9d01112f58630d49d24c83a0af5	2023-06-11 06:07:09.003742+00	20230611060707_cambio_date_tabla_personaje	\N	\N	2023-06-11 06:07:08.337464+00	1
\.


--
-- Data for Name: defensas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.defensas (id, defensa) FROM stdin;
4	Torre del Mago
9	Torre Tesla
10	Cañón Antiaéreo
12	Muro de Fuego
13	Escudo de Energía
\.


--
-- Data for Name: diplomacias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.diplomacias (id_reino_1, id_reino_2, es_aliado) FROM stdin;
5	6	t
7	8	t
8	10	t
5	8	t
5	10	f
6	9	f
6	8	f
7	9	f
\.


--
-- Data for Name: karts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.karts (id, modelo, color, velocidad_maxima, id_personaje) FROM stdin;
10	Lamborghini	azul	75	10
11	Porsche	negro	92	14
12	Bugatti	plateado	100	15
13	Aston Martin	verde	42	18
4	Mercedes Benz	blanco	95	1
14	Audi	negro	80	14
15	BMW	blanco	70	18
16	Mercedes Benz	gris	85	18
17	Porsche	verde	65	18
18	Chevrolet	amarillo	95	18
19	Ford	naranja	50	22
20	Toyota	morado	60	22
21	Nissan	rosado	55	22
\.


--
-- Data for Name: personaje_habita_reino; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.personaje_habita_reino (id_personaje, id_reino, fecha_registro, es_gobernante) FROM stdin;
10	6	2023-06-11 06:35:55.393	t
18	9	2023-06-11 06:47:07.721	t
1	10	2023-06-13 01:06:24.899	f
6	10	2023-06-13 01:29:02.504	f
15	7	2023-06-13 01:29:02.504	t
14	5	2023-06-13 01:29:02.504	t
16	8	2023-06-13 01:29:02.504	t
22	10	2023-06-13 01:29:02.504	t
\.


--
-- Data for Name: personaje_tiene_trabajo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.personaje_tiene_trabajo (id_personaje, id_trabajo, fecha_inicio, fecha_termino) FROM stdin;
10	9	2023-04-01	2023-09-30
14	10	2023-01-01	2023-12-31
15	11	2023-01-01	2023-12-31
16	12	2023-01-01	2023-12-31
18	14	2023-01-01	2023-12-31
\.


--
-- Data for Name: personajes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.personajes (id, nombre, fuerza, fecha_nacimiento, objeto) FROM stdin;
6	Ziggs	50	2000-03-03	Jeweled Gauntlet
10	Ezreal	70	1995-07-10	Guantelete Hextech
14	Thresh	75	1990-08-05	Guadaña
15	Ashe	70	1996-03-07	Arco de Hielo
16	Ekko	75	1999-06-08	Dispositivo de Manipulación Temporal
18	Lulu	65	1998-05-07	Varita Mágica
22	Viego	50	2023-06-11	Spear of Shojin
1	Zac	8	2013-03-29	Brazo Elástico
\.


--
-- Data for Name: reino_defensas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reino_defensas ("reinoId", "defensaId") FROM stdin;
6	13
9	10
9	13
\.


--
-- Data for Name: reinos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reinos (id, nombre, ubicacion, superficie) FROM stdin;
6	Ionia	Runaterra	12000
7	Der Riese	Breslavia, Alemania	0
8	Origins	Campaña del Norte de Francia,	0
9	Shangri-La	Himalayas, Nepal	0
10	Kino der Toten	Berlín, Alemania	1800
5	Reino de Demacia	Valoran	13000
\.


--
-- Data for Name: trabajos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trabajos (id, descripcion, sueldo) FROM stdin;
6	Innovador, Bombardero	4000
8	Vastaya, Hechicera, Encantadora	4800
9	Explorador, Saqueador, Aventurero	5000
10	Thresh es un recolector de almas	5200
11	Arquera de hielo	5500
12	Joven inventor	5200
14	Hada traviesa	5000
24	Ejecutor de justicia	5100
16	Explorador de setas	6500
\.


--
-- Name: defensas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.defensas_id_seq', 13, true);


--
-- Name: karts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.karts_id_seq', 21, true);


--
-- Name: personajes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.personajes_id_seq', 24, true);


--
-- Name: reinos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reinos_id_seq', 10, true);


--
-- Name: trabajos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trabajos_id_seq', 24, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: defensas defensas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.defensas
    ADD CONSTRAINT defensas_pkey PRIMARY KEY (id);


--
-- Name: diplomacias diplomacias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.diplomacias
    ADD CONSTRAINT diplomacias_pkey PRIMARY KEY (id_reino_1, id_reino_2);


--
-- Name: karts karts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.karts
    ADD CONSTRAINT karts_pkey PRIMARY KEY (id);


--
-- Name: personaje_habita_reino personaje_habita_reino_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personaje_habita_reino
    ADD CONSTRAINT personaje_habita_reino_pkey PRIMARY KEY (id_personaje, id_reino);


--
-- Name: personaje_tiene_trabajo personaje_tiene_trabajo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personaje_tiene_trabajo
    ADD CONSTRAINT personaje_tiene_trabajo_pkey PRIMARY KEY (id_trabajo, id_personaje);


--
-- Name: personajes personajes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personajes
    ADD CONSTRAINT personajes_pkey PRIMARY KEY (id);


--
-- Name: reinos reinos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reinos
    ADD CONSTRAINT reinos_pkey PRIMARY KEY (id);


--
-- Name: trabajos trabajos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trabajos
    ADD CONSTRAINT trabajos_pkey PRIMARY KEY (id);


--
-- Name: reino_defensas_reinoId_defensaId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "reino_defensas_reinoId_defensaId_key" ON public.reino_defensas USING btree ("reinoId", "defensaId");


--
-- Name: diplomacias diplomacias_id_reino_1_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.diplomacias
    ADD CONSTRAINT diplomacias_id_reino_1_fkey FOREIGN KEY (id_reino_1) REFERENCES public.reinos(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: diplomacias diplomacias_id_reino_2_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.diplomacias
    ADD CONSTRAINT diplomacias_id_reino_2_fkey FOREIGN KEY (id_reino_2) REFERENCES public.reinos(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: karts karts_id_personaje_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.karts
    ADD CONSTRAINT karts_id_personaje_fkey FOREIGN KEY (id_personaje) REFERENCES public.personajes(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: personaje_habita_reino personaje_habita_reino_id_personaje_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personaje_habita_reino
    ADD CONSTRAINT personaje_habita_reino_id_personaje_fkey FOREIGN KEY (id_personaje) REFERENCES public.personajes(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: personaje_habita_reino personaje_habita_reino_id_reino_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personaje_habita_reino
    ADD CONSTRAINT personaje_habita_reino_id_reino_fkey FOREIGN KEY (id_reino) REFERENCES public.reinos(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: personaje_tiene_trabajo personaje_tiene_trabajo_id_personaje_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personaje_tiene_trabajo
    ADD CONSTRAINT personaje_tiene_trabajo_id_personaje_fkey FOREIGN KEY (id_personaje) REFERENCES public.personajes(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: personaje_tiene_trabajo personaje_tiene_trabajo_id_trabajo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personaje_tiene_trabajo
    ADD CONSTRAINT personaje_tiene_trabajo_id_trabajo_fkey FOREIGN KEY (id_trabajo) REFERENCES public.trabajos(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: reino_defensas reino_defensas_defensaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reino_defensas
    ADD CONSTRAINT "reino_defensas_defensaId_fkey" FOREIGN KEY ("defensaId") REFERENCES public.defensas(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: reino_defensas reino_defensas_reinoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reino_defensas
    ADD CONSTRAINT "reino_defensas_reinoId_fkey" FOREIGN KEY ("reinoId") REFERENCES public.reinos(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM rdsadmin;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

