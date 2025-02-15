PGDMP     ;                    {            tarea2    14.8    15.3 A               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            	           1262    16405    tarea2    DATABASE     r   CREATE DATABASE tarea2 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE tarea2;
                postgres    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            
           0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    5            �            1259    16563    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false    5            �            1259    16624    defensas    TABLE     f   CREATE TABLE public.defensas (
    id integer NOT NULL,
    defensa character varying(45) NOT NULL
);
    DROP TABLE public.defensas;
       public         heap    postgres    false    5            �            1259    16623    defensas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.defensas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.defensas_id_seq;
       public          postgres    false    221    5                       0    0    defensas_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.defensas_id_seq OWNED BY public.defensas.id;
          public          postgres    false    220            �            1259    16631    diplomacias    TABLE     �   CREATE TABLE public.diplomacias (
    id_reino_1 integer NOT NULL,
    id_reino_2 integer NOT NULL,
    es_aliado boolean NOT NULL
);
    DROP TABLE public.diplomacias;
       public         heap    postgres    false    5            �            1259    16582    karts    TABLE     �   CREATE TABLE public.karts (
    id integer NOT NULL,
    modelo character varying(45) NOT NULL,
    color character varying(45) NOT NULL,
    velocidad_maxima integer,
    id_personaje integer NOT NULL
);
    DROP TABLE public.karts;
       public         heap    postgres    false    5            �            1259    16581    karts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.karts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.karts_id_seq;
       public          postgres    false    213    5                       0    0    karts_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.karts_id_seq OWNED BY public.karts.id;
          public          postgres    false    212            �            1259    16607    personaje_habita_reino    TABLE     �   CREATE TABLE public.personaje_habita_reino (
    id_personaje integer NOT NULL,
    id_reino integer NOT NULL,
    fecha_registro timestamp(3) without time zone NOT NULL,
    es_gobernante boolean NOT NULL
);
 *   DROP TABLE public.personaje_habita_reino;
       public         heap    postgres    false    5            �            1259    16591    personaje_tiene_trabajo    TABLE     �   CREATE TABLE public.personaje_tiene_trabajo (
    id_personaje integer NOT NULL,
    id_trabajo integer NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_termino date
);
 +   DROP TABLE public.personaje_tiene_trabajo;
       public         heap    postgres    false    5            �            1259    16573 
   personajes    TABLE     �   CREATE TABLE public.personajes (
    id integer NOT NULL,
    nombre text NOT NULL,
    fuerza integer NOT NULL,
    fecha_nacimiento date NOT NULL,
    objeto text
);
    DROP TABLE public.personajes;
       public         heap    postgres    false    5            �            1259    16572    personajes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.personajes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.personajes_id_seq;
       public          postgres    false    5    211                       0    0    personajes_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.personajes_id_seq OWNED BY public.personajes.id;
          public          postgres    false    210            �            1259    16688    reino_defensas    TABLE     i   CREATE TABLE public.reino_defensas (
    "reinoId" integer NOT NULL,
    "defensaId" integer NOT NULL
);
 "   DROP TABLE public.reino_defensas;
       public         heap    postgres    false    5            �            1259    16615    reinos    TABLE     �   CREATE TABLE public.reinos (
    id integer NOT NULL,
    nombre character varying(45) NOT NULL,
    ubicacion character varying(45) NOT NULL,
    superficie integer NOT NULL
);
    DROP TABLE public.reinos;
       public         heap    postgres    false    5            �            1259    16614    reinos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reinos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.reinos_id_seq;
       public          postgres    false    219    5                       0    0    reinos_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.reinos_id_seq OWNED BY public.reinos.id;
          public          postgres    false    218            �            1259    16598    trabajos    TABLE     �   CREATE TABLE public.trabajos (
    id integer NOT NULL,
    descripcion character varying(45) NOT NULL,
    sueldo integer NOT NULL
);
    DROP TABLE public.trabajos;
       public         heap    postgres    false    5            �            1259    16597    trabajos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.trabajos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.trabajos_id_seq;
       public          postgres    false    216    5                       0    0    trabajos_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.trabajos_id_seq OWNED BY public.trabajos.id;
          public          postgres    false    215            M           2604    16627    defensas id    DEFAULT     j   ALTER TABLE ONLY public.defensas ALTER COLUMN id SET DEFAULT nextval('public.defensas_id_seq'::regclass);
 :   ALTER TABLE public.defensas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    221    221            J           2604    16585    karts id    DEFAULT     d   ALTER TABLE ONLY public.karts ALTER COLUMN id SET DEFAULT nextval('public.karts_id_seq'::regclass);
 7   ALTER TABLE public.karts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    213    213            I           2604    16576    personajes id    DEFAULT     n   ALTER TABLE ONLY public.personajes ALTER COLUMN id SET DEFAULT nextval('public.personajes_id_seq'::regclass);
 <   ALTER TABLE public.personajes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    211    211            L           2604    16618 	   reinos id    DEFAULT     f   ALTER TABLE ONLY public.reinos ALTER COLUMN id SET DEFAULT nextval('public.reinos_id_seq'::regclass);
 8   ALTER TABLE public.reinos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            K           2604    16601    trabajos id    DEFAULT     j   ALTER TABLE ONLY public.trabajos ALTER COLUMN id SET DEFAULT nextval('public.trabajos_id_seq'::regclass);
 :   ALTER TABLE public.trabajos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �          0    16563    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    209   �N                 0    16624    defensas 
   TABLE DATA           /   COPY public.defensas (id, defensa) FROM stdin;
    public          postgres    false    221   DQ                 0    16631    diplomacias 
   TABLE DATA           H   COPY public.diplomacias (id_reino_1, id_reino_2, es_aliado) FROM stdin;
    public          postgres    false    222   �Q       �          0    16582    karts 
   TABLE DATA           R   COPY public.karts (id, modelo, color, velocidad_maxima, id_personaje) FROM stdin;
    public          postgres    false    213   �Q       �          0    16607    personaje_habita_reino 
   TABLE DATA           g   COPY public.personaje_habita_reino (id_personaje, id_reino, fecha_registro, es_gobernante) FROM stdin;
    public          postgres    false    217   �R       �          0    16591    personaje_tiene_trabajo 
   TABLE DATA           h   COPY public.personaje_tiene_trabajo (id_personaje, id_trabajo, fecha_inicio, fecha_termino) FROM stdin;
    public          postgres    false    214   [S       �          0    16573 
   personajes 
   TABLE DATA           R   COPY public.personajes (id, nombre, fuerza, fecha_nacimiento, objeto) FROM stdin;
    public          postgres    false    211   �S                 0    16688    reino_defensas 
   TABLE DATA           @   COPY public.reino_defensas ("reinoId", "defensaId") FROM stdin;
    public          postgres    false    223   �T       �          0    16615    reinos 
   TABLE DATA           C   COPY public.reinos (id, nombre, ubicacion, superficie) FROM stdin;
    public          postgres    false    219   �T       �          0    16598    trabajos 
   TABLE DATA           ;   COPY public.trabajos (id, descripcion, sueldo) FROM stdin;
    public          postgres    false    216   �U                  0    0    defensas_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.defensas_id_seq', 13, true);
          public          postgres    false    220                       0    0    karts_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.karts_id_seq', 21, true);
          public          postgres    false    212                       0    0    personajes_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.personajes_id_seq', 24, true);
          public          postgres    false    210                       0    0    reinos_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.reinos_id_seq', 10, true);
          public          postgres    false    218                       0    0    trabajos_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.trabajos_id_seq', 24, true);
          public          postgres    false    215            O           2606    16571 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    209            ]           2606    16629    defensas defensas_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.defensas
    ADD CONSTRAINT defensas_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.defensas DROP CONSTRAINT defensas_pkey;
       public            postgres    false    221            _           2606    16707    diplomacias diplomacias_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.diplomacias
    ADD CONSTRAINT diplomacias_pkey PRIMARY KEY (id_reino_1, id_reino_2);
 F   ALTER TABLE ONLY public.diplomacias DROP CONSTRAINT diplomacias_pkey;
       public            postgres    false    222    222            S           2606    16589    karts karts_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.karts
    ADD CONSTRAINT karts_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.karts DROP CONSTRAINT karts_pkey;
       public            postgres    false    213            Y           2606    16713 2   personaje_habita_reino personaje_habita_reino_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.personaje_habita_reino
    ADD CONSTRAINT personaje_habita_reino_pkey PRIMARY KEY (id_personaje, id_reino);
 \   ALTER TABLE ONLY public.personaje_habita_reino DROP CONSTRAINT personaje_habita_reino_pkey;
       public            postgres    false    217    217            U           2606    16715 4   personaje_tiene_trabajo personaje_tiene_trabajo_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.personaje_tiene_trabajo
    ADD CONSTRAINT personaje_tiene_trabajo_pkey PRIMARY KEY (id_trabajo, id_personaje);
 ^   ALTER TABLE ONLY public.personaje_tiene_trabajo DROP CONSTRAINT personaje_tiene_trabajo_pkey;
       public            postgres    false    214    214            Q           2606    16580    personajes personajes_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.personajes
    ADD CONSTRAINT personajes_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.personajes DROP CONSTRAINT personajes_pkey;
       public            postgres    false    211            [           2606    16622    reinos reinos_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.reinos
    ADD CONSTRAINT reinos_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.reinos DROP CONSTRAINT reinos_pkey;
       public            postgres    false    219            W           2606    16605    trabajos trabajos_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.trabajos
    ADD CONSTRAINT trabajos_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.trabajos DROP CONSTRAINT trabajos_pkey;
       public            postgres    false    216            `           1259    16694 $   reino_defensas_reinoId_defensaId_key    INDEX     z   CREATE UNIQUE INDEX "reino_defensas_reinoId_defensaId_key" ON public.reino_defensas USING btree ("reinoId", "defensaId");
 :   DROP INDEX public."reino_defensas_reinoId_defensaId_key";
       public            postgres    false    223    223            f           2606    16667 '   diplomacias diplomacias_id_reino_1_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.diplomacias
    ADD CONSTRAINT diplomacias_id_reino_1_fkey FOREIGN KEY (id_reino_1) REFERENCES public.reinos(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Q   ALTER TABLE ONLY public.diplomacias DROP CONSTRAINT diplomacias_id_reino_1_fkey;
       public          postgres    false    222    219    4187            g           2606    16672 '   diplomacias diplomacias_id_reino_2_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.diplomacias
    ADD CONSTRAINT diplomacias_id_reino_2_fkey FOREIGN KEY (id_reino_2) REFERENCES public.reinos(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Q   ALTER TABLE ONLY public.diplomacias DROP CONSTRAINT diplomacias_id_reino_2_fkey;
       public          postgres    false    4187    222    219            a           2606    16642    karts karts_id_personaje_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.karts
    ADD CONSTRAINT karts_id_personaje_fkey FOREIGN KEY (id_personaje) REFERENCES public.personajes(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 G   ALTER TABLE ONLY public.karts DROP CONSTRAINT karts_id_personaje_fkey;
       public          postgres    false    4177    211    213            d           2606    16657 ?   personaje_habita_reino personaje_habita_reino_id_personaje_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.personaje_habita_reino
    ADD CONSTRAINT personaje_habita_reino_id_personaje_fkey FOREIGN KEY (id_personaje) REFERENCES public.personajes(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 i   ALTER TABLE ONLY public.personaje_habita_reino DROP CONSTRAINT personaje_habita_reino_id_personaje_fkey;
       public          postgres    false    211    217    4177            e           2606    16662 ;   personaje_habita_reino personaje_habita_reino_id_reino_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.personaje_habita_reino
    ADD CONSTRAINT personaje_habita_reino_id_reino_fkey FOREIGN KEY (id_reino) REFERENCES public.reinos(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 e   ALTER TABLE ONLY public.personaje_habita_reino DROP CONSTRAINT personaje_habita_reino_id_reino_fkey;
       public          postgres    false    217    219    4187            b           2606    16647 A   personaje_tiene_trabajo personaje_tiene_trabajo_id_personaje_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.personaje_tiene_trabajo
    ADD CONSTRAINT personaje_tiene_trabajo_id_personaje_fkey FOREIGN KEY (id_personaje) REFERENCES public.personajes(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 k   ALTER TABLE ONLY public.personaje_tiene_trabajo DROP CONSTRAINT personaje_tiene_trabajo_id_personaje_fkey;
       public          postgres    false    211    4177    214            c           2606    16652 ?   personaje_tiene_trabajo personaje_tiene_trabajo_id_trabajo_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.personaje_tiene_trabajo
    ADD CONSTRAINT personaje_tiene_trabajo_id_trabajo_fkey FOREIGN KEY (id_trabajo) REFERENCES public.trabajos(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 i   ALTER TABLE ONLY public.personaje_tiene_trabajo DROP CONSTRAINT personaje_tiene_trabajo_id_trabajo_fkey;
       public          postgres    false    4183    216    214            h           2606    16700 ,   reino_defensas reino_defensas_defensaId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reino_defensas
    ADD CONSTRAINT "reino_defensas_defensaId_fkey" FOREIGN KEY ("defensaId") REFERENCES public.defensas(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 X   ALTER TABLE ONLY public.reino_defensas DROP CONSTRAINT "reino_defensas_defensaId_fkey";
       public          postgres    false    223    221    4189            i           2606    16695 *   reino_defensas reino_defensas_reinoId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reino_defensas
    ADD CONSTRAINT "reino_defensas_reinoId_fkey" FOREIGN KEY ("reinoId") REFERENCES public.reinos(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 V   ALTER TABLE ONLY public.reino_defensas DROP CONSTRAINT "reino_defensas_reinoId_fkey";
       public          postgres    false    219    4187    223            �   R  x�u�[n7���W��b���"�� �H!.ڸ�O�.�����=Q����U$��X��+;F_p���Kˣ���	��*�Y:�l���ֲ��� K��)vU������v���a/n'�;�� /A�	1������v������1N��>���X6�1ưMo���1���^��d-�I�y��x Lls��=���:
\��z�����+��)���G��^�j>|�w��i���W�%�Ȟ�,�Y��OE�H���f9�V���]���T��e��0]0c����hՠ���v��D�ۧ��w������/��irT"�k��ʎ�j����K��=6�i�#� �\��#��g����ygH,�9"�����=a���o����s�����Ź��r=D G�,Y�\"�e
̳�6ĥ�v(�,ʚknQxPe-|%GI��z�I���ʍ�����V��w���n_�;��L۶9q�ɼǠ	s�����䵭Ϧ���t��(�m���h	�[/�&-Ifp������v�}�G�8�u�����5����>�������s��~��qq�>��u��������]�         _   x�3��/*JUHI�Q�ML�粄
���$rp:'�xxs��c^If��E��\�F���E�@M
n��@M�Ɯ��ɥ)`!׼Ԣ��k�b���� D� R         .   x�3�4�,�2� ���@��1qҸ�8-���4�c���� �#�      �   �   x�]�1N�0E��S�	��$[n���@���M���񠱳{z�Pо?�ߌ�x���2N>z�u	�-�V���%��Ct�0�L�L�v)g��@���봆����2�CG�}����P�k�*�9���ҡu�s�د��J��e�?�F�4m��;V��T�JF�	��e�ߵ���q���]��ˠ�ć�[��G�����j�*4^��3afٞ�vl��S��ak7�~����YO      �   h   x�}���0Eѵ]`�;�k��T@�"��@d}��� e��c�8ʼ����@�n��SW��o���f��F&�1ެY���&�C��9��W0��:?�G�x6.      �   C   x�u̱�0C�ڷ�!�K@d�����$c���{�5G6]x>�����]�vvk���sD��0!      �     x�-�MN�0F��S�FvJ��EDE��ZuQ�9Cbj��q �6=��v�4���ާ����&�%dRJ!Wq����R�78�R`JBs��J	��s!K����@���鞩{�����<��Y	�'�����a=�t3���^;�F�!�*�9��MQ�
�4���yE�8�q����;�=}�Σe�����P\��;��M@�].��Ȳ�:�x�JJ�n$�ܽ�]����QC�#�<�o�r��ю��1�� x�\            x�3�44��44 �\1z\\\ ��      �   �   x�M�;
AD�S�Tf�DQVX�Ȥ�Ffg��U�P����bbVt���R���Ѱ(�:�̐�,��\3M�뀻G�N���Όh+��cM3��/�3�'iX�]�I3��iwE��oo@K_"���es����}L��OG����3�f#]է����]��!ie���c���{A�      �   �   x�M����0�g�)� �U[�R%`1��O-5�$�$�=10��Yw��;�;�g�,p�o$���,�bg
�^�����,{g�Em4�[C��O��@��H����]L��VyU	�Q8���Ca�'6��4�(@[k���d����)Z5j8�LE���o`Ga�-����W6�ǿ���٬����Z��1�w�rYE�X�V�     