"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  BookOpen,
  Target,
  Plus,
  Trash2,
  GraduationCap,
  Lock,
  Eye,
  EyeOff,
  Menu,
  X,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface StudySession {
  id: string
  subject: string
  chapter: string
  duration: number
  timeSlot: string
  priority: "high" | "medium" | "low"
  notes: string
}

// Password protection
const VALID_PASSWORDS = [
  "parvej",
  "himel",
  "sayem",
  "fighters",
  "KBG31YM2",
  "HUDNGFXD",
  "4FRQDZY0",
  "6YR4I2EV",
  "DTJXF93T",
  "Z9U4Z5FX",
  "59873U1C",
  "JOPDS0YI",
  "3UNQRLBS",
  "IJ8VTIHV",
  "X26CSP0K",
  "6QHUL11M",
  "EETNFR11",
  "SUFMTIQQ",
  "IYVQNCCL",
  "PJVX9V8W",
  "Z47WBY7A",
  "SKVNMAL5",
  "RASR18OO",
  "8M619573",
  "QPBCZTMT",
  "CZTSW64V",
  "1ES4ZRP7",
  "X6QAYOT8",
  "8I5JL0HU",
  "QEJQLFS6",
  "9FFC60JJ",
  "7LJYB5JC",
  "1CFF8SJA",
  "QHW5WL3F",
  "9R69TV1X",
  "1G2W6EUY",
  "K0N0X9YT",
  "P0SVNACJ",
  "CHALMRJP",
  "L2QGNR0Q",
  "Z8UQ0SRS",
  "VGDYX1XX",
  "E7YTI8H7",
  "6UT46V6Q",
  "7F22HUAZ",
  "MPM8TYMW",
  "AVZY0B8S",
  "HG04G64J",
  "80NIHJDC",
  "YGXO1CQJ",
  "8BZ3AFJN",
  "UGLQ0I7I",
  "TYJPPWFI",
  "VZOQCCAA",
  "0QXG8XIZ",
  "PJW9YI78",
  "V6INHTPH",
  "NJMVGXN6",
  "WMXWSFDD",
  "FM3QG847",
  "3NVIJE1C",
  "JAHMTT4W",
  "WKH81XNM",
  "HIO8C9HE",
  "DG8STHVQ",
  "J5HGT3UK",
  "4G89DGRH",
  "F9R0EKI5",
  "86FPZOKZ",
  "FCNO1JTQ",
  "KISKLEYD",
  "1A170JA8",
  "82GJNYFP",
  "GSZH8HQR",
  "OG80NQTI",
  "43N5FGXT",
  "DI7D5L88",
  "49RSG61U",
  "DTE00J37",
  "AFB54NEN",
  "1UP3N4WM",
  "MD6KHGP9",
  "7WBQI7SA",
  "COEJMH23",
  "TERQ3N21",
  "SYF83N5I",
  "YACUTGXH",
  "NHRASSWM",
  "9SRE7D62",
  "MZYUOPNY",
  "ZKVD9NIX",
  "AWIWIN7P",
  "D5AES1XJ",
  "S631ZBG3",
  "RP8S07L3",
  "8OE9QYD2",
  "RPQIUGD1",
  "EA56ZG65",
  "CCVESK4X",
  "ATV2825X",
  "7BW6TQ51",
  "MM52O55Z",
  "IUZY9K4S",
  "D8P1PDQ3",
  "XTLBHV1H",
  "SIPE3AW9",
  "L4JF5SLQ",
  "FLAS8TDY",
  "TM3P2RVJ",
  "517D8YRO",
  "A0CZVKBU",
  "ZLOBJ606",
  "LOX1ZZAJ",
  "DYJQL29E",
  "WODRQJ8J",
  "7S2HYXC3",
  "III8YNVB",
  "7CAV7C8O",
  "1SUL3KDM",
  "CAKWRHCT",
  "ABFD7FR7",
  "DBX3CD5P",
  "YOIDS1AC",
  "KWF5HZ1E",
  "98CNHWPK",
  "EITQLZ72",
  "WHWMX5II",
  "G0BXO23H",
  "COEVEIUT",
  "IANGXJF7",
  "AYWVW94A",
  "O4WGJV85",
  "UY6WOXU3",
  "U22XY1HA",
  "SJ2D1VQ8",
  "8CUYCBEZ",
  "H2USPBUR",
  "P74WFI31",
  "TONA0YXX",
  "R3D73F6L",
  "PVWCX2YL",
  "FN4EEP0F",
  "IVYECVKK",
  "QCLI7950",
  "B8ER0ZP3",
  "BNVWASLW",
  "LWFX2E25",
  "L5W0FVYK",
  "KIDZZGWG",
  "XWLISV7E",
  "HOWALPEB",
  "QGF8R79A",
  "GA0OS3ER",
  "JLT990JD",
  "WS8WL7IW",
  "IWNH0XTM",
  "96N23MSH",
  "9XLBK0BQ",
  "40ZB3AS5",
  "R4JZY988",
  "F7ZGOQWS",
  "1VM37NXZ",
  "68UIA9JC",
  "KBXGS89C",
  "9TDYWF0S",
  "HT8N3V1V",
  "NQIZAWBL",
  "HJPH62R6",
  "A8EDPIKH",
  "QO2RV2RU",
  "OYXLXOZ6",
  "LIB6HTID",
  "TTAKDE5N",
  "PITZ7UZR",
  "F4LE724H",
  "OQU1Z5L4",
  "YDQI4PNR",
  "GEO4UK5Z",
  "FTFUOU8I",
  "HMTKRCBR",
  "FC67C3S2",
  "ALS87CSM",
  "01OUJOL2",
  "6HRULVRS",
  "PBEYAKD8",
  "S1PNKDAG",
  "ETOPEZGY",
  "1VWNJXP0",
  "6YZOAM6H",
  "7IL2G96O",
  "XIKV8UAV",
  "HFGNLMPB",
  "UZQT25FI",
  "WOVI3U96",
  "Q716OBKK",
  "MWEH8NWX",
  "523WZST9",
  "6OIDBG50",
  "0818EKF7",
  "AH34JHYF",
  "YXQAXTZ3",
  "LUDL1IRA",
  "NMSYAVOW",
  "TMUYJ4ER",
  "Z4GLH02J",
  "1ILD37CS",
  "0WLNIOFF",
  "WJIOW3XD",
  "W68A37NF",
  "I7X6EYB6",
  "E8Z2IBYB",
  "OI6E1SBH",
  "73FFZS2H",
  "CI2ZUCL9",
  "3UEZ1A5P",
  "58Z0XHXM",
  "IKO8JKG4",
  "VG8TOOGO",
  "IRLQGHOQ",
  "P3G7YZJ9",
  "YJ8CO7PJ",
  "ZPCTLMRM",
  "IX8SK064",
  "292GN42M",
  "4K3OHRB7",
  "D9KF4XSK",
  "PW0GMALW",
  "U7F2721T",
  "TRDXHELF",
  "OGTSRVK6",
  "7C0P2OUQ",
  "EK1IM7GK",
  "OGDW39EL",
  "T2IW02GZ",
  "8XZ8G9AX",
  "08SR8VKB",
  "KDDE51UB",
  "AF03B13H",
  "0NRRUA60",
  "DEOGNSDK",
  "EHBAFKRE",
  "8440E6PA",
  "UJG5JAN4",
  "8ZRE9NYV",
  "0OXSNUOE",
  "YK9BMQNN",
  "0U1YVNGQ",
  "4U3A1U0F",
  "X5N5C5JK",
  "Q2AHFKL1",
  "FEENS68L",
  "LTNXF153",
  "AZ3OMOO1",
  "SGC2XHA7",
  "JRNSQ6M3",
  "LSG4UARM",
  "D128PQM3",
  "H4362Q0G",
  "X7OK6VVS",
  "FLSELUNJ",
  "5G39MF7Q",
  "8D8GIT5N",
  "N8WS8T2G",
  "F3OF4BXB",
  "U1031UZR",
  "UA0L9G7K",
  "BP0V3LAI",
  "O32XNG4Z",
  "Q6XZF26T",
  "UUJZ9PYP",
  "U2HWDOWE",
  "PV1W5L7Z",
  "J4UUNYSG",
  "WT5ZFNH9",
  "QYA5KM95",
  "8B320YB4",
  "3VSVZLJL",
  "72BFMMU8",
  "FCIGSYF9",
  "UR0PJ86N",
  "G9KU7HPD",
  "3B933UAF",
  "C2Y4J57E",
  "RUJI3U3N",
  "VI56MIT5",
  "X535X3UW",
  "QGLVDX3F",
  "0SOIEH1B",
  "ENFQ9U6X",
  "GZ0B2CXT",
  "NZQDJGLT",
  "BOILKRKA",
  "4URITSTG",
  "1D056KF1",
  "ZFM8S6ZY",
  "BRPX7O2O",
  "WAH9SI9X",
  "Y816Q474",
  "B4BILQYH",
  "7LZZJF1U",
  "HNOZL6S8",
  "AWVT4261",
  "AELRVO1B",
  "RCQSSZ79",
  "AM1MXNDM",
  "H6W6TVCA",
  "VTCWMK4R",
  "GB4YVQUG",
  "MF8WBWSI",
  "28LPVOFK",
  "SG6RP3IO",
  "24HJVN5J",
  "339AQ6ES",
  "803U8GMV",
  "6OC731VU",
  "299ABKYC",
  "S2U01OGA",
  "IQSJMMXV",
  "K9QAT6G3",
  "CW803F0J",
  "3YV7OLQO",
  "5MJGTOPJ",
  "ESGB03SH",
  "EMPGUPTV",
  "IXF7JV9X",
  "DDMDKU5Y",
  "7AGIK5D9",
  "CA8WRPEW",
  "MWMRG51V",
  "DW2W1CDI",
  "Q50UT0TS",
  "4HSUVDXT",
  "RANYGT0O",
  "EDJCRKSY",
  "P4ZVRXF2",
  "C0UVPF2J",
  "BIOMLM49",
  "XOIFEXE8",
  "ZUJO4C88",
  "KGA9UW47",
  "I5G3U2WP",
  "U3F71OO1",
  "ADE3G7TU",
  "VXA7HBQN",
  "2BROFNZL",
  "EEP23JSS",
  "D4005SE6",
  "1HH4B06T",
  "DGWA3JE6",
  "WPO8OHLF",
  "GKLLSILQ",
  "HUZSXMU2",
  "VFWNUKSW",
  "OZ7HBY1Y",
  "87RSJUOM",
  "UX4QISYH",
  "C1MMWEOU",
  "1IQYDEAY",
  "UU19MKQ5",
  "7IVDTS0U",
  "VEJ8J497",
  "431LKNXE",
  "VRORPW74",
  "FC2AYMFP",
  "NG7BC6FU",
  "7972MM2A",
  "PWVWE8T8",
  "2CHOGJPR",
  "CB3BBUDU",
  "HQ0ZWF9V",
  "3HT6UKGX",
  "7BK759LD",
  "KN7EHK0V",
  "IW5OYN2P",
  "VX5AC68F",
  "YU1SYQXJ",
  "RBQGX8D2",
  "OUFRXDZY",
  "PSSGIQVV",
  "08L7EBY7",
  "F686626Q",
  "PLY8OUDI",
  "OXCRV2T5",
  "OFB2TTR8",
  "SMJJEC7U",
  "F857C2DM",
  "2KKYUC48",
  "NGV4LB8R",
  "T79TMAIF",
  "VLJHOH3F",
  "KTOPDZFU",
  "PQ6ZN0K2",
  "0KU9TNAO",
  "ST0OX745",
  "ILSDZYLE",
  "B8RVDLFE",
  "J0M9W5YQ",
  "PO4LTBFG",
  "HPBOZE6P",
  "NL2YY01H",
  "KZR40I8P",
  "WI0JBEVU",
  "GALBP3WB",
  "F8BBYT4F",
  "9GLRFQ5L",
  "M8G2XGDD",
  "NYJOH99N",
  "5A1SRYDB",
  "CCG9MRAT",
  "55U73ZS0",
  "YZS1LB3E",
  "JSH7JT3F",
  "7UTHDUQR",
  "5G1FJ914",
  "F1O89HIF",
  "GZWPN9T2",
  "7WMXUZN1",
  "OMHJXV7Q",
  "2QAKTSXA",
  "XLLG1S97",
  "C0H3QYIC",
  "36REZH5J",
  "83G4FI20",
  "YCYH17IM",
  "BV8DKEVR",
  "5SXKTMW6",
  "F804W2EG",
  "BGH0CGSZ",
  "S3QNX00M",
  "O6TSUE7S",
  "D4ZR3Q83",
  "J8OBWMM4",
  "1I3OEDS9",
  "7PO1YAB4",
  "JETII7RL",
  "P3GZFN0A",
  "KBYL769G",
  "LZZ96C5K",
  "8Y6XL9KF",
  "Q63N32VZ",
  "SPY8M1CL",
  "CILONKD4",
  "MRW6NPBI",
  "PJUJ0VEA",
  "0ZW3A7EG",
  "CYH23VS2",
  "F8MB7TYY",
  "V6LAE1O9",
  "AWI9EA1B",
  "OBMVEOQ2",
  "1FBF0DTP",
  "HAN5H7YI",
  "H7Z0LSBA",
  "FCBZUC0A",
  "QT4APW8P",
  "3J3ME2FI",
  "KUBOWW6A",
  "5PPK5EQ4",
  "GB19NHIJ",
  "2WCPLDT4",
  "O3EUEOWB",
  "S2GYBN17",
  "0NRHLPXL",
  "FECAUUQY",
  "T3XING04",
  "1UZXDOK8",
  "8Z87UDMM",
  "1A1GA1I4",
  "UACWVSE2",
  "3A921CW7",
  "HO4RIHAQ",
  "BVTHTFGD",
  "3AM6G7DU",
  "QRHATSBX",
  "B76F1WKA",
  "QZHTPXT3",
  "8OOTFYIW",
  "2Q9LU2AJ",
  "MK2CDSS2",
  "1SE2QL6D",
  "JIST7RUR",
  "6B4JOMLQ",
  "I6F6N4L2",
  "JQRU0ZKF",
  "8WK8JURJ",
  "TUQUUA1U",
  "082VOHKW",
  "TAOL71EJ",
  "LQVTC1WX",
  "R221GSDF",
  "RPTJYK4L",
  "W0XU7UGY",
  "AKIINBNS",
  "8K4NQM0P",
  "NW3SMHIY",
  "EL3LGUKM",
  "WPPQWFSM",
  "J7UIM5YF",
  "00PO5433",
  "BWNSQMLB",
  "35GKRSCN",
  "S3RKHQIJ",
  "7S5NCY4B",
  "3gpAs3O",
  "iy2VGxp",
  "8YOqfVz",
  "Ul0XZIA",
  "Gh9pXlz",
  "ZcrgrP4",
  "DS8StR3",
  "iNKxrD8",
  "Hx0CRxC",
  "3RRcWyg",
  "yqnLVNy",
  "9gyZ6JO",
  "yNRvcE0",
  "DoUl8uB",
  "kziRhbg",
  "t0Kiryw",
  "WXkMbtu",
  "gS4fEwS",
  "arhnBa6",
  "34JBDVr",
  "gme24N6",
  "2zkYsJ4",
  "LJ6YOWa",
  "L0aS7Cy",
  "rIw9oKO",
  "vNbQVar",
  "suiZBAf",
  "jiabIma",
  "zmQyb92",
  "lOx5mUs",
  "Hrybo1T",
  "WlksfXa",
  "6Cu1XMZ",
  "mzMkxpV",
  "riZNZMJ",
  "aFgggrl",
  "CkSzK0I",
  "KXZaBS2",
  "9r5pte3",
  "yPUXloi",
  "hf5EyVI",
  "TYMZUOo",
  "wkvgMGd",
  "DXN6D57",
  "5c7Dqn2",
  "3salDaG",
  "kD9xzvR",
  "jEDpStV",
  "gmiopVk",
  "tSGDzA8",
  "KUdfxDJ",
  "t2Vyu0V",
  "2r3o66z",
  "76YPsbU",
  "Qor5q8u",
  "VtGeCmI",
  "5HoabUP",
  "Q98AXIo",
  "ByNHwD9",
  "qHlY3RM",
  "UMpqb6I",
  "PRp81Tm",
  "TLVHscT",
  "4RGAmI9",
  "0Ki07CJ",
  "12KOcfe",
  "SSJ1jag",
  "SN40QYt",
  "zBlqFc7",
  "DUXVKIx",
  "zV82WSP",
  "IbNsUkr",
  "AGab5iC",
  "6rNOTQs",
  "9Q9le6l",
  "sSArqsV",
  "NbJBlUf",
  "H0ysVrS",
  "Hm3wLCY",
  "1MHN2eH",
  "DZxwaHj",
  "GhldLfE",
  "I5NIkZj",
  "XtGrfYP",
  "cYoc89W",
  "QHg7RUv",
  "cMglkwq",
  "YbLYEX8",
  "iAQ1SxQ",
  "TcGOfSk",
  "i8NH4xy",
  "8r3RAst",
  "8C2ugYM",
  "yTCjqgu",
  "vVW5tHx",
  "H5OsaZk",
  "84GmItT",
  "dLMZV94",
  "CmD4iak",
  "HBQ7Mdx",
  "CBkATBt",
  "HXC6fNp",
  "1vuxmZz",
  "nGcE14R",
  "uv45zfP",
  "iWccAx7",
  "eAuTJqL",
  "zc9eFxl",
  "41U0TQW",
  "mdCpTWt",
  "826YWSw",
  "Lui60rO",
  "GaGxHVM",
  "6u2NyDB",
  "yzf6dRI",
  "1eGOYhT",
  "r4FzcRp",
  "cwO76mT",
  "AkGOyVz",
  "PuPq3Gx",
  "L4be8SF",
  "IYapiSk",
  "dbn890U",
  "wJuxTWW",
  "UKBVl2v",
  "cH8g362",
  "PqWMsPt",
  "7UcieN0",
  "yhmIEtw",
  "eab5Xgx",
  "UunwwmZ",
  "OC3djD3",
  "C1qiaeR",
  "f8TdwVa",
  "d7q5eln",
  "0PQmT5A",
  "9bpLPBN",
  "SlXCNy4",
  "RM4WWsT",
  "Mh0rjK7",
  "fIyRDgy",
  "Ze0XnOh",
  "eH9YLYf",
  "jzs8kHS",
  "8v63BjN",
  "53pCvWs",
  "oyAyHiW",
  "PX1kLZj",
  "pF5MSF7",
  "UYOh5tc",
  "qErgWbN",
  "H0NT5NS",
  "OoltaDP",
  "THj27We",
  "OlDUbOd",
  "8xgNy5w",
  "8GwZS0M",
  "5r2g1h1",
  "oe3MW81",
  "imfrVVu",
  "dSDO7XG",
  "4FUD5eC",
  "YlKgSN6",
  "kOgy0t9",
  "RdBzp5u",
  "TlMT12o",
  "l55GPCQ",
  "jw1404v",
  "v06CYa4",
  "NX9Lk8k",
  "lwuGmLj",
  "gM4IpdP",
  "STAl4FP",
  "5rRwL0p",
  "sFLQPyG",
  "FCSGDl0",
  "77sHqyx",
  "fizDw13",
  "a7lLH2F",
  "dsSQWPg",
  "rFf4mUl",
  "vVvjYMQ",
  "21Tx78y",
  "0Tueylb",
  "FCQ946d",
  "FeWTEkd",
  "5Wsp99k",
  "KvV0wlG",
  "DVzne2s",
  "gaUvQdf",
  "KepXvPS",
  "aPEL0vB",
  "WjseV3v",
  "vGaM9dC",
  "HXqnHsq",
  "8TGmuGj",
  "VKXZpcS",
  "hPmnP7Q",
  "jOc9mb2",
  "jeCTv07",
  "FCVikyG",
  "mMXw9Qn",
  "74gtfoH",
  "K5sCU7w",
  "hvLkGCP",
  "1tS6ZSZ",
  "rqpyuCp",
  "A9zXa7g",
  "3OU9rfh",
  "89Ab2YF",
  "6roBmdI",
  "G5PDGBv",
  "FMQD4Ot",
  "z9sWtIh",
  "lImYnmC",
  "gkj15tG",
  "UYzaSwX",
  "lv2e3kA",
  "Reyfl55",
  "bukRb9k",
  "V6DV8Kd",
  "yENVaYS",
  "lsWHqGP",
  "lQDlSjc",
  "mdqOZos",
  "NaqMzT9",
  "YYzxYvQ",
  "XfBlkph",
  "G4mq5vs",
  "bvHku9d",
  "z51OWH4",
  "UcoCs6b",
  "RJY88In",
  "74S9OIL",
  "mVFsU9o",
  "YupJoH1",
  "x1mPj1W",
  "TvPhjy1",
  "f3qcTb1",
  "8iBz8Lj",
  "x4lyhJc",
  "hs1mXDQ",
  "40ODzsF",
  "5yLL68D",
  "HlQjZ42",
  "X9SnB6M",
  "gmCCsUu",
  "VtQDpSr",
  "B7wY5ms",
  "HOcwIm9",
  "Mca20oL",
  "ntWbcK4",
  "Q92jVQY",
  "H31BpZL",
  "oahrA1v",
  "hVtAz9P",
  "Ny5cyPo",
  "DibL7K1",
  "68IM4lt",
  "WPq2cCK",
  "0PBbhJg",
  "1QgakXQ",
  "MCUG7Z4",
  "hYH1qQ2",
  "iRIToO9",
  "t67ouQb",
  "LmAl3O2",
  "391Eev4",
  "3wXryaO",
  "qX3Cks5",
  "bqv8pgS",
  "BxYig06",
  "PrAb8Tm",
  "CDUaHzw",
  "B1z7yEI",
  "zIfFAoj",
  "F4Qpyqw",
  "IayPtwE",
  "MPxb98C",
  "4DIZbVE",
  "1i8fkJA",
  "hsTaMh9",
  "FZP2RUz",
  "2t2EMzL",
  "Cx0oLoA",
  "XAcceDe",
  "druFnbp",
  "04vyAQ0",
  "OS6JwiF",
  "MKF1aHx",
  "HTNR3RK",
  "RlpQ0Iu",
  "MaNcYFL",
  "IeBcbUT",
  "QOpoIKd",
  "LHVX9rG",
  "zmkBgOi",
  "jNhkRhP",
  "ih9evRb",
  "M02FePO",
  "4LkoPFj",
  "ophV2tN",
  "VFL23wu",
  "2WDNaz2",
  "nK4Q4Hm",
  "vbkNLHN",
  "3OMpJSI",
  "sKqxGMG",
  "EcdrZNe",
  "LrATovO",
  "kXEon4u",
  "0kgli90",
  "Ucr7P5a",
  "sM7qROv",
  "xCvJhch",
  "Ub1lDme",
  "VB2l13y",
  "NwRleON",
  "dzgPfDN",
  "pDKqlL8",
  "UutbP8Z",
  "p160dbx",
  "SpWd5P3",
  "zohpJIi",
  "M5Esxe8",
  "gKPkBgo",
  "77gbKmo",
  "mShYFdK",
  "9AgtDLR",
  "4pnC0uC",
  "rMVBXMG",
  "t0Ii9jW",
  "nsQJNqT",
  "s55xn9H",
  "WJPgsQp",
  "UKAMHxg",
  "CFnOJPZ",
  "sciIFUn",
  "8O16PWu",
]

// All subjects with their chapters
const subjects = [
  {
    name: "পদার্থবিজ্ঞান ১ম পত্র",
    chapters: ["ভেক্টর", "নিউটনীয় বলবিদ্যা", "কাজ, শক্তি ও ক্ষমতা", "মহাকর্ষ", "পদার্থের গাঠনিক ধর্ম", "পর্যাবৃত্তিক গতি", "আদর্শ গ্যাস"],
    days: 1,
  },
  {
    name: "পদার্থবিজ্ঞান ২য় পত্র",
    chapters: ["তাপগতিবিদ্যা", "স্থির তড়িৎ", "চল তড়িৎ", "ভৌত আলোক বিজ্ঞান", "আধুনিক পদার্থবিজ্ঞান", "পরমাণুর মডেল", "সেমিকন্ডাক্টর"],
    days: 1,
  },
  {
    name: "রসায়ন ১ম পত্র",
    chapters: ["গুণগত রসায়ন", "মৌলের পর্যায়বৃত্ত ধর্ম", "রাসায়নিক পরিবর্তন", "কর্মমুখী রসায়ন"],
    days: 3, // Changed from 2 to 3 days
  },
  {
    name: "রসায়ন ২য় পত্র",
    chapters: ["পরিবেশ রসায়ন", "জৈব রসায়ন", "পরিমাণগত রসায়ন", "তড়িৎ রসায়ন"],
    days: 3, // Changed from 2 to 3 days
  },
  {
    name: "জীববিজ্ঞান ১ম পত্র",
    chapters: ["কোষ গঠন", "কোষ বিভাজন", "অনুজীব", "নগ্নবীজী", "টিস্যু", "উদ্ভিদ শারীরতত্ত্ব", "জীব প্রযুক্তি"],
    days: 1,
  },
  {
    name: "জীববিজ্ঞান ২য় পত্র",
    chapters: ["প্রাণী বিভিন্নতা", "প্রাণী পরিচিতি", "পরিপাক", "রক্ত সংবহন", "শ্বসন", "চলন", "জিনতত্ত্ব"],
    days: 1,
  },
  {
    name: "উচ্চতর গণিত ১ম পত্র",
    chapters: ["ম্যাট্রিক্স", "সরলরেখা", "বৃত্ত", "সংযুক্ত কোণের অনুপাত", "অন্তরীকরণ", "যোগজীকরণ"],
    days: 2, // Changed from 1 to 2 days
  },
  {
    name: "উচ্চতর গণিত ২য় পত্র",
    chapters: ["জটিল সংখ্যা", "বহুপদী সমীকরণ", "কণিক", "বিপরীত ফাংশন", "স্থিতিবিদ্যা", "বস্তুকণার গতি"],
    days: 2, // Changed from 1 to 2 days
  },
]

// Special treatment for selected chapters
const specialChapters: { [key: string]: number } = {
  // Chemistry chapters
  "জৈব রসায়ন": 5, // Changed from 4 to 5 days
  "কর্মমুখী রসায়ন": 1, // Added - 1 day only

  // Math chapters - specific ones get 1 day only
  ম্যাট্রিক্স: 1,
  বৃত্ত: 1,
  স্থিতিবিদ্যা: 1,
  "বস্তুকণার গতি": 1,
  "বহুপদী সমীকরণ": 1,

  // Math chapters that keep 2 days
  অন্তরীকরণ: 2,
  যোগজীকরণ: 2,
  সরলরেখা: 2,
  কণিক: 2,

  // Physics chapters
  "স্থির তড়িৎ": 2, // Added - 2 days
  "চল তড়িৎ": 2, // Added - 2 days

  // Other existing chapters
  "উদ্ভিদ শারীরতত্ত্ব": 2,
  "নিউটনীয় বলবিদ্যা": 2,
  তাপগতিবিদ্যা: 2,
  ভেক্টর: 2,
}

// Exam schedule - starting 2 weeks from now, every 2 weeks on Friday
const getExamSchedule = () => {
  const exams = []
  const startDate = new Date()
  startDate.setDate(startDate.getDate() + 14) // 2 weeks from now

  // Find the next Friday
  while (startDate.getDay() !== 5) {
    startDate.setDate(startDate.getDate() + 1)
  }

  subjects.forEach((subject, index) => {
    const examDate = new Date(startDate)
    examDate.setDate(examDate.getDate() + index * 14) // Each exam 2 weeks apart (14 days)
    exams.push({
      subject: "Previous 2 weeks completed units",
      date: examDate,
      time: "10:00 AM - 1:00 PM",
    })
  })

  return exams
}

// Start date - July 1, 2025
const startDate = new Date(2025, 6, 1)

export default function StudyRoutineApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [currentView, setCurrentView] = useState<"home" | "routine" | "exams" | "advanceRoutine">("home")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [countdown, setCountdown] = useState("")
  const [sessions, setSessions] = useState<StudySession[]>([])
  const [currentSession, setCurrentSession] = useState<Partial<StudySession>>({
    subject: "",
    chapter: "",
    duration: 60,
    timeSlot: "",
    priority: "medium",
    notes: "",
  })

  const subjectNames = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "History",
    "Geography",
    "Computer Science",
  ]

  const timeSlots = [
    "6:00 AM - 7:00 AM",
    "7:00 AM - 8:00 AM",
    "8:00 AM - 9:00 AM",
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
    "7:00 PM - 8:00 PM",
    "8:00 PM - 9:00 PM",
    "9:00 PM - 10:00 PM",
  ]

  // Check authentication status on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem("studyRoutineAuth")
    const authTime = localStorage.getItem("studyRoutineAuthTime")

    if (authStatus === "true" && authTime) {
      const timeDiff = Date.now() - Number.parseInt(authTime)
      // Keep authentication for 24 hours
      if (timeDiff < 24 * 60 * 60 * 1000) {
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem("studyRoutineAuth")
        localStorage.removeItem("studyRoutineAuthTime")
      }
    }
    setIsLoading(false)
  }, [])

  // Load sessions from localStorage on component mount
  useEffect(() => {
    if (isAuthenticated) {
      const savedSessions = localStorage.getItem("studyRoutineSessions")
      if (savedSessions) {
        try {
          const parsedSessions = JSON.parse(savedSessions)
          setSessions(parsedSessions)
        } catch (error) {
          console.error("Error loading sessions from localStorage:", error)
        }
      }
    }
  }, [isAuthenticated])

  // Save sessions to localStorage whenever sessions change
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("studyRoutineSessions", JSON.stringify(sessions))
    }
  }, [sessions, isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setInterval(() => {
        const now = new Date()
        setCurrentTime(now)

        // Calculate countdown to end of day
        const endOfDay = new Date()
        endOfDay.setHours(23, 59, 59, 999)
        const diff = endOfDay.getTime() - now.getTime()

        if (diff <= 0) {
          setCountdown("00:00:00")
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60))
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((diff % (1000 * 60)) / 1000)
          setCountdown(
            `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
          )
        }
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isAuthenticated])

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError("")

    // Convert input to lowercase and check against lowercase passwords
    const inputPassword = password.toLowerCase().trim()
    const validPasswordsLower = VALID_PASSWORDS.map((p) => p.toLowerCase())

    if (validPasswordsLower.includes(inputPassword)) {
      setIsAuthenticated(true)
      localStorage.setItem("studyRoutineAuth", "true")
      localStorage.setItem("studyRoutineAuthTime", Date.now().toString())
      setPassword("")
    } else {
      setPasswordError("Invalid password. Please try again.")
      setPassword("")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("studyRoutineAuth")
    localStorage.removeItem("studyRoutineAuthTime")
    setCurrentView("home")
  }

  // Show loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show password protection screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl text-blue-800">Access Required</CardTitle>
            <CardDescription>Please enter the password to access the Study Routine System</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="pr-10"
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
              </div>
              <Button type="submit" className="w-full">
                Access System
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Developed by{" "}
                <a
                  href="https://parvejahmed.top"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Parvej Ahmed
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("bn-BD", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getDayNumber = (date: Date) => {
    let dayCount = 0
    const currentDate = new Date(startDate)
    currentDate.setHours(0, 0, 0, 0)

    const targetDate = new Date(date)
    targetDate.setHours(0, 0, 0, 0)

    // If start date is Friday, move to next Saturday
    if (currentDate.getDay() === 5) {
      currentDate.setDate(currentDate.getDate() + 1)
    }

    while (currentDate < targetDate) {
      // Count only non-Friday days
      if (currentDate.getDay() !== 5) {
        dayCount++
      }
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return dayCount
  }

  const getSubjectForDate = (date: Date) => {
    // Handle Friday as practice day
    if (date.getDay() === 5) {
      return { isPracticeDay: true }
    }

    // Check if date is before start date
    if (date < startDate) {
      return {
        name: "Routine hasn't started yet",
        chapter: "Starts on July 1, 2025",
      }
    }

    // Calculate the number of study days since start (excluding Fridays)
    const dayNumber = getDayNumber(date)
    let currentDay = 0
    let cycle = 0

    // Find which subject and chapter should be studied on this day
    while (true) {
      // Get only subjects that haven't completed all chapters in this cycle
      const activeSubjects = subjects.filter((subject) => cycle < subject.chapters.length)

      // If no active subjects in this cycle, start a new cycle
      if (activeSubjects.length === 0) {
        cycle = 0
        // Reset and continue with all subjects again
        const allSubjects = subjects

        // Calculate total days needed for one complete cycle through all subjects
        let totalDaysInCycle = 0
        for (const subject of allSubjects) {
          const currentChapter = subject.chapters[cycle % subject.chapters.length]
          // Use special chapter days if available, otherwise use subject default days
          const daysForSubject = specialChapters[currentChapter] || subject.days
          totalDaysInCycle += daysForSubject
        }

        // Check if the target day falls within this cycle
        if (dayNumber < currentDay + totalDaysInCycle) {
          let dayInCycle = dayNumber - currentDay

          // Find which subject within this cycle
          for (const subject of allSubjects) {
            const currentChapter = subject.chapters[cycle % subject.chapters.length]
            const daysForSubject = specialChapters[currentChapter] || subject.days

            if (dayInCycle < daysForSubject) {
              return {
                name: subject.name,
                chapter: currentChapter,
                chapterNumber: (cycle % subject.chapters.length) + 1,
                isExtraTime: daysForSubject > 1,
                dayInSubject: dayInCycle + 1,
                daysForSubject: daysForSubject,
              }
            }
            dayInCycle -= daysForSubject
          }
        }

        currentDay += totalDaysInCycle
        cycle++
        continue
      }

      // Calculate total days needed for one complete cycle through active subjects only
      let totalDaysInCycle = 0
      for (const subject of activeSubjects) {
        const currentChapter = subject.chapters[cycle % subject.chapters.length]
        // Use special chapter days if available, otherwise use subject default days
        const daysForSubject = specialChapters[currentChapter] || subject.days
        totalDaysInCycle += daysForSubject
      }

      // Check if the target day falls within this cycle
      if (dayNumber < currentDay + totalDaysInCycle) {
        let dayInCycle = dayNumber - currentDay

        // Find which subject within this cycle (only active subjects)
        for (const subject of activeSubjects) {
          const currentChapter = subject.chapters[cycle % subject.chapters.length]
          const daysForSubject = specialChapters[currentChapter] || subject.days

          if (dayInCycle < daysForSubject) {
            return {
              name: subject.name,
              chapter: currentChapter,
              chapterNumber: (cycle % subject.chapters.length) + 1,
              isExtraTime: daysForSubject > 1,
              dayInSubject: dayInCycle + 1,
              daysForSubject: daysForSubject,
            }
          }
          dayInCycle -= daysForSubject
        }
      }

      currentDay += totalDaysInCycle
      cycle++

      // Safety break to prevent infinite loop - removed the limit, but keep a reasonable one
      if (cycle > 1000) {
        // If we somehow reach here, just cycle back to the beginning
        const subjectIndex = dayNumber % subjects.length
        const subject = subjects[subjectIndex]
        const chapterIndex = Math.floor(dayNumber / subjects.length) % subject.chapters.length
        const chapter = subject.chapters[chapterIndex]
        const daysForSubject = specialChapters[chapter] || subject.days

        return {
          name: subject.name,
          chapter: chapter,
          chapterNumber: chapterIndex + 1,
          isExtraTime: daysForSubject > 1,
          dayInSubject: 1,
          daysForSubject: daysForSubject,
        }
      }
    }
  }

  // Get today's subject with proper date handling
  const getTodaySubject = () => {
    const today = new Date()
    // Reset time to start of day for accurate comparison
    today.setHours(0, 0, 0, 0)

    const result = getSubjectForDate(today)

    return result
  }

  const todaySubject = getTodaySubject()

  const examSchedule = getExamSchedule()
  const upcomingExams = examSchedule.filter((exam) => exam.date >= currentTime).slice(0, 3)

  const addSession = () => {
    if (currentSession.subject && currentSession.chapter && currentSession.timeSlot) {
      const newSession: StudySession = {
        id: Date.now().toString(),
        subject: currentSession.subject!,
        chapter: currentSession.chapter!,
        duration: currentSession.duration || 60,
        timeSlot: currentSession.timeSlot!,
        priority: currentSession.priority || "medium",
        notes: currentSession.notes || "",
      }
      setSessions([...sessions, newSession])
      setCurrentSession({
        subject: "",
        chapter: "",
        duration: 60,
        timeSlot: "",
        priority: "medium",
        notes: "",
      })
    }
  }

  const removeSession = (id: string) => {
    setSessions(sessions.filter((session) => session.id !== id))
  }

  const clearAllSessions = () => {
    setSessions([])
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderHomeView = () => (
    <div className="space-y-6">
      {/* Today's Study Plan */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl text-blue-800 flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Today's Study Plan
          </CardTitle>
          <Badge variant="outline" className="text-sm">
            {formatDate(currentTime)}
          </Badge>
        </CardHeader>
        <CardContent>
          {todaySubject?.isPracticeDay ? (
            <div className="text-center py-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg">
              <Target className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">🎯 Practice Day</h2>
              <p className="text-lg">Focus on revising all previous topics!</p>
            </div>
          ) : todaySubject?.allSubjectsCompleted ? (
            <div className="text-center py-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg">
              <GraduationCap className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">{todaySubject.name}</h2>
              <p className="text-lg">{todaySubject.chapter}</p>
            </div>
          ) : (
            <div className="text-center py-6">
              <h3 className="text-3xl font-bold text-indigo-800 mb-4">{todaySubject?.name}</h3>
              <div
                className={`text-2xl mb-4 ${
                  todaySubject?.isExtraTime ? "text-purple-600 font-semibold" : "text-gray-700"
                }`}
              >
                {todaySubject?.chapter}
              </div>
              {todaySubject?.isExtraTime && (
                <Badge className="bg-purple-500 text-white text-sm px-3 py-1 mb-2">
                  Day {todaySubject.dayInSubject} of {todaySubject.daysForSubject}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Rest of the component remains the same */}
      {/* Countdown Timer */}
      <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200">
        <CardContent className="text-center py-6">
          <div className="flex items-center justify-center gap-2 text-cyan-800 text-xl">
            <Clock className="h-6 w-6" />
            <span>Time left today: </span>
            <span className="font-bold text-2xl text-cyan-600">{countdown}</span>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Exams */}
      <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
        <CardHeader>
          <CardTitle className="text-xl text-orange-800 flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            Upcoming Exams
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingExams.map((exam, index) => {
              const examDateOnly = new Date(exam.date.getFullYear(), exam.date.getMonth(), exam.date.getDate())
              const currentDateOnly = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate())
              const daysUntil = Math.ceil((examDateOnly.getTime() - currentDateOnly.getTime()) / (1000 * 60 * 60 * 24))

              return (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-white rounded-lg border border-orange-200"
                >
                  <div>
                    <div className="font-semibold text-gray-800">{exam.subject}</div>
                    <div className="text-sm text-gray-600">{exam.time}</div>
                    <div className="text-xs text-orange-600 font-medium">
                      {daysUntil > 1 ? `${daysUntil} দিন বাকি` : daysUntil === 1 ? "আগামীকাল" : "আজ!"}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-orange-700 border-orange-300">
                    {exam.date.toLocaleDateString("bn-BD", { month: "short", day: "numeric" })}
                  </Badge>
                </div>
              )
            })}
          </div>
          {upcomingExams.length === 0 && <p className="text-gray-500 text-center py-4">No upcoming exams scheduled</p>}
        </CardContent>
      </Card>
    </div>
  )

  const renderRoutineView = () => {
    const routineData = []
    const currentDate = new Date(startDate)
    let daysDisplayed = 0

    while (daysDisplayed < 90) {
      const subjectInfo = getSubjectForDate(currentDate)
      const isToday = currentDate.toDateString() === currentTime.toDateString()

      routineData.push({
        date: new Date(currentDate),
        subject: subjectInfo?.isPracticeDay ? "Practice Day" : subjectInfo?.name,
        chapter: subjectInfo?.isPracticeDay ? "Revise all previous topics" : subjectInfo?.chapter,
        note: subjectInfo?.isPracticeDay
          ? "🎯 Revision day"
          : subjectInfo?.allSubjectsCompleted
            ? "🎉 Completed!"
            : subjectInfo?.isExtraTime
              ? `⭐ Day ${subjectInfo.dayInSubject}/${subjectInfo.daysForSubject}`
              : "",
        isToday,
        isPracticeDay: subjectInfo?.isPracticeDay,
        isCompleted: subjectInfo?.allSubjectsCompleted,
        isExtraTime: subjectInfo?.isExtraTime,
      })

      currentDate.setDate(currentDate.getDate() + 1)
      daysDisplayed++
    }

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Upcoming Study Routine</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="p-3 text-left border">Date</th>
                    <th className="p-3 text-left border">Day</th>
                    <th className="p-3 text-left border">Subject</th>
                    <th className="p-3 text-left border">Chapter</th>
                    <th className="p-3 text-left border">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {routineData.map((row, index) => (
                    <tr
                      key={index}
                      className={`${
                        row.isToday ? "bg-blue-100 border-blue-300" : index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100 transition-colors`}
                    >
                      <td className="p-3 border">{formatDate(row.date)}</td>
                      <td className="p-3 border">{row.date.toLocaleDateString("en-US", { weekday: "long" })}</td>
                      <td className="p-3 border font-medium">{row.subject}</td>
                      <td
                        className={`p-3 border ${
                          row.isCompleted
                            ? "text-green-600 font-semibold"
                            : row.isExtraTime
                              ? "text-purple-600 font-semibold"
                              : row.isPracticeDay
                                ? "text-red-600 font-semibold"
                                : ""
                        }`}
                      >
                        {row.chapter}
                      </td>
                      <td
                        className={`p-3 border font-medium ${
                          row.isPracticeDay
                            ? "text-red-600"
                            : row.isCompleted
                              ? "text-red-600"
                              : row.isExtraTime
                                ? "text-purple-600"
                                : ""
                        }`}
                      >
                        {row.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderExamsView = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <GraduationCap className="h-8 w-8" />
            Exam Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {examSchedule.map((exam, index) => {
              const isUpcoming = exam.date >= currentTime
              // More accurate calculation that considers the actual date difference
              const examDateOnly = new Date(exam.date.getFullYear(), exam.date.getMonth(), exam.date.getDate())
              const currentDateOnly = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate())
              const daysUntil = Math.ceil((examDateOnly.getTime() - currentDateOnly.getTime()) / (1000 * 60 * 60 * 24))

              return (
                <Card
                  key={index}
                  className={`${
                    isUpcoming ? "border-orange-300 bg-orange-50" : "border-gray-300 bg-gray-50 opacity-60"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{exam.subject}</h3>
                        <p className="text-gray-600">{formatDate(exam.date)}</p>
                        <p className="text-sm text-gray-500">{exam.time}</p>
                      </div>
                      <div className="text-right">
                        {isUpcoming ? (
                          <Badge className="bg-orange-500 text-white">
                            {daysUntil > 1
                              ? `${daysUntil} দিন বাকি`
                              : daysUntil === 1
                                ? "আগামীকাল"
                                : daysUntil === 0
                                  ? "আজ!"
                                  : "আজ!"}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-500">
                            সম্পন্ন
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAdvanceRoutineView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Add Session Form */}
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Study Session
          </CardTitle>
          <CardDescription>Create a new study session for your routine</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Select
                value={currentSession.subject}
                onValueChange={(value) => setCurrentSession({ ...currentSession, subject: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjectNames.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="chapter">Chapter/Topic</Label>
              <Input
                id="chapter"
                value={currentSession.chapter}
                onChange={(e) => setCurrentSession({ ...currentSession, chapter: e.target.value })}
                placeholder="Enter chapter or topic"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={currentSession.duration}
                onChange={(e) => setCurrentSession({ ...currentSession, duration: Number.parseInt(e.target.value) })}
                min="15"
                max="180"
              />
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={currentSession.priority}
                onValueChange={(value: "high" | "medium" | "low") =>
                  setCurrentSession({ ...currentSession, priority: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="timeSlot">Time Slot</Label>
            <Select
              value={currentSession.timeSlot}
              onValueChange={(value) => setCurrentSession({ ...currentSession, timeSlot: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={currentSession.notes}
              onChange={(e) => setCurrentSession({ ...currentSession, notes: e.target.value })}
              placeholder="Add any additional notes..."
              rows={3}
            />
          </div>

          <Button onClick={addSession} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Session
          </Button>
        </CardContent>
      </Card>

      {/* Study Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Your Study Schedule
          </CardTitle>
          <CardDescription>
            {sessions.length} session{sessions.length !== 1 ? "s" : ""} planned
            {sessions.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllSessions}
                className="ml-4 text-red-600 hover:text-red-700 bg-transparent"
              >
                Clear All
              </Button>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sessions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No study sessions added yet.</p>
              <p className="text-sm">Add your first session to get started!</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {sessions
                .sort((a, b) => a.timeSlot.localeCompare(b.timeSlot))
                .map((session) => (
                  <div key={session.id} className="border rounded-lg p-4 bg-white shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{session.subject}</h3>
                          <Badge className={getPriorityColor(session.priority)}>{session.priority}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{session.chapter}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {session.timeSlot}
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            {session.duration} min
                          </span>
                        </div>
                        {session.notes && <p className="text-xs text-gray-600 mt-2 italic">{session.notes}</p>}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSession(session.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800 flex items-center gap-2">
            <Calendar className="h-8 w-8" />
            Study Routine
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <nav className="flex gap-2">
              <Button variant={currentView === "home" ? "default" : "outline"} onClick={() => setCurrentView("home")}>
                Home
              </Button>
              <Button
                variant={currentView === "routine" ? "default" : "outline"}
                onClick={() => setCurrentView("routine")}
              >
                Full Routine
              </Button>
              <Button variant={currentView === "exams" ? "default" : "outline"} onClick={() => setCurrentView("exams")}>
                Exam Schedule
              </Button>
              <Button
                variant={currentView === "advanceRoutine" ? "default" : "outline"}
                onClick={() => setCurrentView("advanceRoutine")}
              >
                Advance Routine
              </Button>
            </nav>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 bg-transparent"
            >
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="outline" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </header>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mb-6 bg-white rounded-lg shadow-lg border p-4">
            <nav className="flex flex-col gap-2">
              <Button
                variant={currentView === "home" ? "default" : "outline"}
                onClick={() => {
                  setCurrentView("home")
                  setIsMobileMenuOpen(false)
                }}
                className="w-full justify-start"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button
                variant={currentView === "routine" ? "default" : "outline"}
                onClick={() => {
                  setCurrentView("routine")
                  setIsMobileMenuOpen(false)
                }}
                className="w-full justify-start"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Full Routine
              </Button>
              <Button
                variant={currentView === "exams" ? "default" : "outline"}
                onClick={() => {
                  setCurrentView("exams")
                  setIsMobileMenuOpen(false)
                }}
                className="w-full justify-start"
              >
                <GraduationCap className="h-4 w-4 mr-2" />
                Exam Schedule
              </Button>
              <Button
                variant={currentView === "advanceRoutine" ? "default" : "outline"}
                onClick={() => {
                  setCurrentView("advanceRoutine")
                  setIsMobileMenuOpen(false)
                }}
                className="w-full justify-start"
              >
                <Target className="h-4 w-4 mr-2" />
                Advance Routine
              </Button>
              <div className="border-t pt-2 mt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    handleLogout()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main>
          {currentView === "home" && renderHomeView()}
          {currentView === "routine" && renderRoutineView()}
          {currentView === "exams" && renderExamsView()}
          {currentView === "advanceRoutine" && renderAdvanceRoutineView()}
        </main>
      </div>

      {/* Summary Stats */}
      {sessions.length > 0 && currentView === "advanceRoutine" && (
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Study Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{sessions.length}</div>
                  <div className="text-sm text-gray-600">Total Sessions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {sessions.reduce((total, session) => total + session.duration, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Minutes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {new Set(sessions.map((s) => s.subject)).size}
                  </div>
                  <div className="text-sm text-gray-600">Subjects</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    {sessions.filter((s) => s.priority === "high").length}
                  </div>
                  <div className="text-sm text-gray-600">High Priority</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-100 border-t mt-16">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-gray-600">
            © 2025 Educapedia. All rights reserved. | Developed by{" "}
            <a
              href="https://parvejahmed.top"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Parvej Ahmed
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
