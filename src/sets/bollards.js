const BOLLARDS = {
	"title": "Guess the country",
	"footer": "Write the country the bollard is from.",
	"sets": [
    { "letter": "https://i.imgur.com/rNHd97g.png", "answers": ["AX", "Åland Islands", "Aland Islands", "Åland", "Aland"] },
	{ "letter": "https://i.imgur.com/f7UImXz.png", "answers": ["AL", "Albania"] },
	{ "letter": "https://i.imgur.com/T3P88qe.jpg", "answers": ["AL", "Albania"] },
	{ "letter": "https://i.imgur.com/qMbTTzv.png", "answers": ["AR", "Argentina"] },
	{ "letter": "https://i.imgur.com/zrtwKgT.png", "answers": ["AR", "Argentina"] },
	{ "letter": "https://i.imgur.com/jTRerHm.png", "answers": ["AR", "Argentina"] },
	{ "letter": "https://i.imgur.com/iv6Y3vn.png", "answers": ["AR", "Argentina"] },
	{ "letter": "https://i.imgur.com/htiHh9X.jpg", "answers": ["AR", "Argentina"] },
	{ "letter": "https://i.imgur.com/QgYGkAl.png", "answers": ["AU", "Australia"] },
	{ "letter": "https://i.imgur.com/NVzlEsf.png", "answers": ["AU", "Australia"] },
	{ "letter": "https://i.imgur.com/VcU5bse.png", "answers": ["AU", "Australia"] },
	{ "letter": "https://i.imgur.com/wh8G3OV.png", "answers": ["AU", "Australia"] },
	{ "letter": "https://i.imgur.com/QymGqmr.png", "answers": ["BD", "Bangladesh"] },
	{ "letter": "https://i.imgur.com/RezaIVT.png", "answers": ["BE", "Belgium"] },
	{ "letter": "https://i.imgur.com/A5bmEDh.jpg", "answers": ["BE", "Belgium"] },
	{ "letter": "https://i.imgur.com/jgDexNN.png", "answers": ["AT", "Austria"] },
	{ "letter": "https://i.imgur.com/6juMrpn.png", "answers": ["AT", "Austria"] },
	{ "letter": "https://i.imgur.com/tQsyaz7.png", "answers": ["AT", "Austria"] },
	{ "letter": "https://i.imgur.com/1ja7c2z.png", "answers": ["BT", "Bhutan"] },
	{ "letter": "https://i.imgur.com/p8lZp3W.png", "answers": ["BT", "Bhutan"] },
	{ "letter": "https://i.imgur.com/Vbup6DT.png", "answers": ["BT", "Bhutan"] },
	{ "letter": "https://i.imgur.com/jUm2n60.png", "answers": ["BT", "Bhutan"] },
	{ "letter": "https://i.imgur.com/2iS796M.png", "answers": ["BT", "Bhutan"] },
	{ "letter": "https://i.imgur.com/rAl0GPC.jpg", "answers": ["BO", "Bolivia"] },
	{ "letter": "https://i.imgur.com/XeDvPhU.jpg", "answers": ["BR", "Brazil"] },
	{ "letter": "https://i.imgur.com/hWvgIjA.png", "answers": ["BG", "Bulgaria"] },
	{ "letter": "https://i.imgur.com/Uj8zAGq.png", "answers": ["BG", "Bulgaria"] },
	{ "letter": "https://i.imgur.com/EV0lJYn.png", "answers": ["KH", "Cambodia"] },
	{ "letter": "https://i.imgur.com/nXC4vv8.png", "answers": ["KH", "Cambodia"] },
	{ "letter": "https://i.imgur.com/WaC1IzW.jpg", "answers": ["KH", "Cambodia"] },
	{ "letter": "https://i.imgur.com/A7SRZr5.jpg", "answers": ["KH", "Cambodia"] },
	{ "letter": "https://i.imgur.com/Y1XHDbi.jpg", "answers": ["KH", "Cambodia"] },
	{ "letter": "https://i.imgur.com/yliiQ30.jpg", "answers": ["KH", "Cambodia"] },
	{ "letter": "https://i.imgur.com/EhHdCP4.jpg", "answers": ["CA", "Canada"] },
	{ "letter": "https://i.imgur.com/0luROhl.jpg", "answers": ["CA", "Canada"] },
	{ "letter": "https://i.imgur.com/5F3kHl7.jpg", "answers": ["CA", "Canada"] },
	{ "letter": "https://i.imgur.com/HMTzdfy.jpg", "answers": ["CA", "Canada"] },
	{ "letter": "https://i.imgur.com/xmw3aOX.jpg", "answers": ["CA", "Canada"] },
	{ "letter": "https://i.imgur.com/ZzbJfLd.jpg", "answers": ["CL", "Chile"] },
	{ "letter": "https://i.imgur.com/qzaO52A.jpg", "answers": ["CL", "Chile"] },
	{ "letter": "https://i.imgur.com/nP2if26.jpg", "answers": ["CO", "Colombia"] },
	{ "letter": "https://i.imgur.com/dbm8CnQ.png", "answers": ["HR", "Croatia"] },
	{ "letter": "https://i.imgur.com/ckAfv9H.png", "answers": ["CZ", "Czechia"] },
	{ "letter": "https://i.imgur.com/j9xjs8O.jpg", "answers": ["CZ", "Czechia"] },
	{ "letter": "https://i.imgur.com/zlPeA2g.jpg", "answers": ["DK", "Denmark"] },
	{ "letter": "https://i.imgur.com/zBV5UhO.png", "answers": ["EC", "Ecuador"] },
	{ "letter": "https://i.imgur.com/a3wgRag.jpg", "answers": ["EC", "Ecuador"] },
	{ "letter": "https://i.imgur.com/HtPgioy.png", "answers": ["EC", "Ecuador"] },
	{ "letter": "https://i.imgur.com/LHyYvsm.jpg", "answers": ["EC", "Ecuador"] },
	{ "letter": "https://i.imgur.com/13uYeg4.jpg", "answers": ["EC", "Ecuador"] },
	{ "letter": "https://i.imgur.com/f8umHuo.png", "answers": ["EE", "Estonia"] },
	{ "letter": "https://i.imgur.com/DMmW3za.png", "answers": ["EE", "Estonia"] },
	{ "letter": "https://i.imgur.com/y1vcvfx.jpg", "answers": ["FI", "Finland"] },
	{ "letter": "https://i.imgur.com/JE7HfKl.jpg", "answers": ["FI", "Finland"] },
	{ "letter": "https://i.imgur.com/eRfKrtH.png", "answers": ["FR", "France"] },
	{ "letter": "https://i.imgur.com/02sO1li.png", "answers": ["FR", "France"] },
	{ "letter": "https://i.imgur.com/FBhyATu.png", "answers": ["FR", "France"] },
	{ "letter": "https://i.imgur.com/pwQJgg1.png", "answers": ["FR", "France"] },
	{ "letter": "https://i.imgur.com/YnsdNH7.png", "answers": ["DE", "Germany"] },
	{ "letter": "https://i.imgur.com/jZNRHMO.png", "answers": ["GH", "Ghana"] },
	{ "letter": "https://i.imgur.com/cTrWe2M.png", "answers": ["GR", "Greece"] },
	{ "letter": "https://i.imgur.com/lBF2RsX.jpg", "answers": ["GR", "Greece"] },
	{ "letter": "https://i.imgur.com/W9xpR3l.jpg", "answers": ["GT", "Guatemala"] },
	{ "letter": "https://i.imgur.com/VfabmAk.png", "answers": ["HU", "Hungary"] },
	{ "letter": "https://i.imgur.com/9FFv6Z5.jpg", "answers": ["HU", "Hungary"] },
	{ "letter": "https://i.imgur.com/XeJeiG2.png", "answers": ["IS", "Iceland"] },
	{ "letter": "https://i.imgur.com/ZchAvEa.jpg", "answers": ["ID", "Indonesia"] },
	{ "letter": "https://i.imgur.com/mv6VZuB.png", "answers": ["ID", "Indonesia"] },
	{ "letter": "https://i.imgur.com/FXJlJsq.png", "answers": ["ID", "Indonesia"] },
	{ "letter": "https://i.imgur.com/wqH9FTl.png", "answers": ["ID", "Indonesia"] },
	{ "letter": "https://i.imgur.com/0ioNCGC.png", "answers": ["ID", "Indonesia"] },
	{ "letter": "https://i.imgur.com/K0lYZqh.jpg", "answers": ["ID", "Indonesia"] },
	{ "letter": "https://i.imgur.com/2H5eEna.png", "answers": ["IE", "Ireland"] },
	{ "letter": "https://i.imgur.com/YWB6ua1.png", "answers": ["IE", "Ireland"] },
	{ "letter": "https://i.imgur.com/UlrBSMu.png", "answers": ["IT", "Italy"] },
	{ "letter": "https://i.imgur.com/ANe4VOJ.jpg", "answers": ["IT", "Italy"] },
	{ "letter": "https://i.imgur.com/5DkDGuW.png", "answers": ["JP", "Japan"] },
	{ "letter": "https://i.imgur.com/QWSICy5.png", "answers": ["JP", "Japan"] },
	{ "letter": "https://i.imgur.com/AuR4Kta.png", "answers": ["JP", "Japan"] },
	{ "letter": "https://i.imgur.com/A7cOAUZ.jpg", "answers": ["KG", "Kyrgyzstan"] },
	{ "letter": "https://i.imgur.com/A77RF1C.jpg", "answers": ["KG", "Kyrgyzstan"] },
	{ "letter": "https://i.imgur.com/Wb7M1AQ.png", "answers": ["LV", "Latvia"] },
	{ "letter": "https://i.imgur.com/79gSkSa.png", "answers": ["LV", "Latvia"] },
	{ "letter": "https://i.imgur.com/IpulsSw.png", "answers": ["LV", "Latvia"] },
	{ "letter": "https://i.imgur.com/3D6FIpJ.png", "answers": ["LT", "Lithuania"] },
	{ "letter": "https://i.imgur.com/vJ4ygOL.png", "answers": ["LT", "Lithuania"] },
	{ "letter": "https://i.imgur.com/w9xAwzH.jpg", "answers": ["LU", "Luxembourg"] },
	{ "letter": "https://i.imgur.com/5fbau7b.jpg", "answers": ["LU", "Luxembourg"] },
	{ "letter": "https://i.imgur.com/0XL8ASJ.jpg", "answers": ["LU", "Luxembourg"] },
	{ "letter": "https://i.imgur.com/J8CaSuO.png", "answers": ["MY", "Malaysia"] },
	{ "letter": "https://i.imgur.com/XXhC7YF.png", "answers": ["MY", "Malaysia"] },
	{ "letter": "https://i.imgur.com/jvtVBTn.png", "answers": ["MY", "Malaysia"] },
	{ "letter": "https://i.imgur.com/gRwBRrq.jpg", "answers": ["MY", "Malaysia"] },
	{ "letter": "https://i.imgur.com/wcX4ChQ.jpg", "answers": ["MX", "Mexico"] },
	{ "letter": "https://i.imgur.com/GRpMeCZ.jpg", "answers": ["MX", "Mexico"] },
	{ "letter": "https://i.imgur.com/Fyg3APT.jpg", "answers": ["MX", "Mexico"] },
	{ "letter": "https://i.imgur.com/nxcArVl.jpg", "answers": ["MN", "Mongolia"] },
	{ "letter": "https://i.imgur.com/wTvIFnH.png", "answers": ["ME", "Montenegro"] },
	{ "letter": "https://i.imgur.com/LWdCcRr.png", "answers": ["NL", "Netherlands"] },
	{ "letter": "https://i.imgur.com/8Iymf9B.jpg", "answers": ["NL", "Netherlands"] },
	{ "letter": "https://i.imgur.com/5mNAljW.jpg", "answers": ["NL", "Netherlands"] },
	{ "letter": "https://i.imgur.com/kRqWMpj.png", "answers": ["MK", "North Macedonia", "NM", "NMK", "Macedonia"] },
	{ "letter": "https://i.imgur.com/ul5RFsW.png", "answers": ["MK", "North Macedonia", "NM", "NMK", "Macedonia"] },
	{ "letter": "https://i.imgur.com/KxLGyaD.jpg", "answers": ["NO", "Norway"] },
	{ "letter": "https://i.imgur.com/Vy6vNxb.png", "answers": ["NZ", "New Zealand"] },
	{ "letter": "https://i.imgur.com/0DBqkhu.png", "answers": ["PE", "Peru"] },
	{ "letter": "https://i.imgur.com/a2BaOXV.png", "answers": ["PE", "Peru"] },
	{ "letter": "https://i.imgur.com/kWfAVKT.jpg", "answers": ["PE", "Peru"] },
	{ "letter": "https://i.imgur.com/3PX3XTb.jpg", "answers": ["PH", "Philippines"] },
	{ "letter": "https://i.imgur.com/F9aH2Mm.jpg", "answers": ["PH", "Philippines"] },
	{ "letter": "https://i.imgur.com/tCC9aI8.jpg", "answers": ["PH", "Philippines"] },
	{ "letter": "https://i.imgur.com/gzxD8le.jpg", "answers": ["PH", "Philippines"] },
	{ "letter": "https://i.imgur.com/yG0D5xk.png", "answers": ["PL", "Poland"] },
	{ "letter": "https://i.imgur.com/7aTVlVV.png", "answers": ["PT", "Portugal"] },
	{ "letter": "https://i.imgur.com/VCtkZnC.jpg", "answers": ["PT", "Portugal"] },
	{ "letter": "https://i.imgur.com/1CrEPGX.jpg", "answers": ["PT", "Portugal"] },
	{ "letter": "https://i.imgur.com/qSIFb0V.jpg", "answers": ["RO", "Romania"] },
	{ "letter": "https://i.imgur.com/TXYZtN5.jpg", "answers": ["RO", "Romania"] },
	{ "letter": "https://i.imgur.com/l41dvQx.jpg", "answers": ["RO", "Romania"] },
	{ "letter": "https://i.imgur.com/C1SY6G1.jpg", "answers": ["RU", "Russia"] },
	{ "letter": "https://i.imgur.com/6rN5K5i.jpg", "answers": ["RU", "Russia"] },
	{ "letter": "https://i.imgur.com/134TODh.jpg", "answers": ["RU", "Russia"] },
	{ "letter": "https://i.imgur.com/Dycu9cH.jpg", "answers": ["RU", "Russia"] },
	{ "letter": "https://i.imgur.com/fy77n1j.jpg", "answers": ["RU", "Russia"] },
	{ "letter": "https://i.imgur.com/aGQKNA2.jpg", "answers": ["RU", "Russia"] },
	{ "letter": "https://i.imgur.com/eJnVoLe.png", "answers": ["ZA", "South Africa", "SA"] },
	{ "letter": "https://i.imgur.com/voK3bke.jpg", "answers": ["ZA", "South Africa", "SA"] },
	{ "letter": "https://i.imgur.com/do44RMN.jpg", "answers": ["SN", "Senegal"] },
	{ "letter": "https://i.imgur.com/v8s1Cci.jpg", "answers": ["SN", "Senegal"] },
	{ "letter": "https://i.imgur.com/UmF421q.jpg", "answers": ["SN", "Senegal"] },
	{ "letter": "https://i.imgur.com/wEPP6K1.png", "answers": ["RS", "Serbia"] },
	{ "letter": "https://i.imgur.com/5zfOBZy.png", "answers": ["RS", "Serbia"] },
	{ "letter": "https://i.imgur.com/IsPDUH0.png", "answers": ["RS", "Serbia"] },
	{ "letter": "https://i.imgur.com/gGyzy6z.png", "answers": ["KR", "South Korea", "SK"] },
	{ "letter": "https://i.imgur.com/RfWc0XY.png", "answers": ["KR", "South Korea", "SK"] },
	{ "letter": "https://i.imgur.com/XIFH7gD.png", "answers": ["KR", "South Korea", "SK"] },
	{ "letter": "https://i.imgur.com/3zYElCz.png", "answers": ["LK", "Sri Lanka", "SL"] },
	{ "letter": "https://i.imgur.com/w7AOizO.jpg", "answers": ["LK", "Sri Lanka", "SL"] },
	{ "letter": "https://i.imgur.com/2dnXodu.png", "answers": ["LK", "Sri Lanka", "SL"] },
	{ "letter": "https://i.imgur.com/6DtMYuv.png", "answers": ["SK", "Slovakia"] },
	{ "letter": "https://i.imgur.com/MmIe0iM.png", "answers": ["SK", "Slovakia"] },
	{ "letter": "https://i.imgur.com/tLLzcF7.png", "answers": ["SI", "Slovenia"] },
	{ "letter": "https://i.imgur.com/KV9AU7S.png", "answers": ["SM", "San Marino"] },
	{ "letter": "https://i.imgur.com/QHD7snl.png", "answers": ["ES", "Spain"] },
	{ "letter": "https://i.imgur.com/XnDxcrV.jpg", "answers": ["ES", "Spain"] },
	{ "letter": "https://i.imgur.com/ltsLAyD.jpg", "answers": ["ES", "Spain"] },
	{ "letter": "https://i.imgur.com/qaV2UMl.jpg", "answers": ["SE", "Sweden"] },
	{ "letter": "https://i.imgur.com/KfboBT5.jpg", "answers": ["SE", "Sweden"] },
	{ "letter": "https://i.imgur.com/kAR4BrM.jpg", "answers": ["CH", "Switzerland"] },
	{ "letter": "https://i.imgur.com/u2cIK5f.jpg", "answers": ["CH", "Switzerland"] },
	{ "letter": "https://i.imgur.com/szptEQv.png", "answers": ["TW", "Taiwan"] },
	{ "letter": "https://i.imgur.com/WKIqJ4u.png", "answers": ["TW", "Taiwan"] },
	{ "letter": "https://i.imgur.com/iGMkLu1.png", "answers": ["TW", "Taiwan"] },
	{ "letter": "https://i.imgur.com/eSq9lYC.png", "answers": ["TW", "Taiwan"] },
	{ "letter": "https://i.imgur.com/2HlAbdj.png", "answers": ["TH", "Thailand"] },
	{ "letter": "https://i.imgur.com/3bdIRRI.png", "answers": ["TH", "Thailand"] },
	{ "letter": "https://i.imgur.com/8IUQ8xE.png", "answers": ["TH", "Thailand"] },
	{ "letter": "https://i.imgur.com/y8zJbxm.png", "answers": ["TR", "Turkey"] },
	{ "letter": "https://i.imgur.com/jrNDh2y.jpg", "answers": ["AE", "United Arab Emirates", "UAE"] },
	{ "letter": "https://i.imgur.com/T3ru0Dj.png", "answers": ["GB", "United Kingdom", "UK", "Great Britain"] },
	{ "letter": "https://i.imgur.com/ttDXh2V.png", "answers": ["GB", "United Kingdom", "UK", "Great Britain"] },
	{ "letter": "https://i.imgur.com/mElHs9o.png", "answers": ["GB", "United Kingdom", "UK", "Great Britain"] },
	{ "letter": "https://i.imgur.com/9oQldyZ.jpg", "answers": ["UA", "Ukraine"] },
	{ "letter": "https://i.imgur.com/Ax4w7nx.jpg", "answers": ["UA", "Ukraine"] },
	{ "letter": "https://i.imgur.com/JbUxzhQ.jpg", "answers": ["UA", "Ukraine"] },
	{ "letter": "https://i.imgur.com/0V1gDli.png", "answers": ["UY", "Uruguay"] },
	{ "letter": "https://i.imgur.com/dwfMs3t.png", "answers": ["UY", "Uruguay"] },
	{ "letter": "https://i.imgur.com/pB272IQ.png", "answers": ["UY", "Uruguay"] },
	{ "letter": "https://i.imgur.com/QuisiTT.jpg", "answers": ["US", "United States", "United States of America", "USA"] },
	{ "letter": "https://i.imgur.com/rA5WbZy.jpg", "answers": ["US", "United States", "United States of America", "USA"] },
	{ "letter": "https://i.imgur.com/Fg973tI.jpg", "answers": ["US", "United States", "United States of America", "USA"] },
  ]
};

module.exports = BOLLARDS;