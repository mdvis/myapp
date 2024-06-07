--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

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
-- Name: userdetail; Type: TABLE; Schema: public; Owner: mdvis
--

CREATE TABLE public.userdetail (
    uid integer,
    intro character varying(100),
    profile character varying(100)
);


ALTER TABLE public.userdetail OWNER TO mdvis;

--
-- Name: userinfo; Type: TABLE; Schema: public; Owner: mdvis
--

CREATE TABLE public.userinfo (
    uid integer NOT NULL,
    username character varying(100) NOT NULL,
    departname character varying(500) NOT NULL,
    created date
);


ALTER TABLE public.userinfo OWNER TO mdvis;

--
-- Name: userinfo_uid_seq; Type: SEQUENCE; Schema: public; Owner: mdvis
--

CREATE SEQUENCE public.userinfo_uid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.userinfo_uid_seq OWNER TO mdvis;

--
-- Name: userinfo_uid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mdvis
--

ALTER SEQUENCE public.userinfo_uid_seq OWNED BY public.userinfo.uid;


--
-- Name: userinfo uid; Type: DEFAULT; Schema: public; Owner: mdvis
--

ALTER TABLE ONLY public.userinfo ALTER COLUMN uid SET DEFAULT nextval('public.userinfo_uid_seq'::regclass);


--
-- Data for Name: userdetail; Type: TABLE DATA; Schema: public; Owner: mdvis
--

COPY public.userdetail (uid, intro, profile) FROM stdin;
\.


--
-- Data for Name: userinfo; Type: TABLE DATA; Schema: public; Owner: mdvis
--

COPY public.userinfo (uid, username, departname, created) FROM stdin;
10	laotie2	dev	2000-01-02
11	laotie2	dev	2000-01-02
12	laotie2	dev	2000-01-02
13	laotie2	dev	2000-01-02
14	laotie2	dev	2000-01-02
15	laotie2	dev	2000-01-02
16	laotie2	dev	2000-01-02
17	laotie2	dev	2000-01-02
18	laotie2	dev	2000-01-02
19	laotie2	dev	2000-01-02
20	laotie2	dev	2000-01-02
21	laotie2	dev	2000-01-02
22	laotie2	dev	2000-01-02
23	laotie2	dev	2000-01-02
\.


--
-- Name: userinfo_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: mdvis
--

SELECT pg_catalog.setval('public.userinfo_uid_seq', 23, true);


--
-- Name: userinfo userinfo_pkey; Type: CONSTRAINT; Schema: public; Owner: mdvis
--

ALTER TABLE ONLY public.userinfo
    ADD CONSTRAINT userinfo_pkey PRIMARY KEY (uid);


--
-- PostgreSQL database dump complete
--

