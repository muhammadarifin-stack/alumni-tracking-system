function tampilkanAlumni(){

let div=document.getElementById("alumniList");

div.innerHTML="";

alumniMaster.forEach(a=>{

div.innerHTML+=`

<div class="card">

<b>${a.nama}</b><br>
Prodi: ${a.prodi}<br>
Tahun Lulus: ${a.tahunLulus}<br>
Kota: ${a.kota}<br>
Status: ${a.status}

</div>

`;

});

}

tampilkanAlumni();

function buildSearchProfile(alumni){

return{

namaVariasi:[
alumni.nama,
alumni.nama.split(" ")[0],
alumni.nama.replace("Muhammad","M.")
],

afiliasi:[
"Universitas Muhammadiyah Malang",
"UMM",
alumni.prodi
],

konteks:[
alumni.kota,
alumni.tahunLulus
]

};

}

const sources=[

{name:"Google Scholar",priority:1},
{name:"ORCID",priority:2},
{name:"Directory Kampus",priority:3},
{name:"Web Umum",priority:4}

];

function runTrackingJob(){

alumniMaster.forEach(alumni=>{

if(alumni.status==="Belum Dilacak" || alumni.status==="Perlu Verifikasi Manual"){

trackAlumni(alumni);

}

});

tampilkanAlumni();

}

function generateQueries(alumni){

return[

`${alumni.nama} Universitas Muhammadiyah Malang`,
`${alumni.nama} Informatika UMM`,
`${alumni.nama} site:scholar.google.com`,
`${alumni.nama} ORCID`,
`${alumni.nama} Software Engineer ${alumni.kota}`

];

}

function searchSources(query){

return[

{
sumber:"Google Scholar",
nama:"Muhammad Rizky",
afiliasi:"Universitas Muhammadiyah Malang",
role:"Research Assistant",
lokasi:"Malang",
tahun:2023,
link:"https://scholar.google.com"
},

{
sumber:"Directory Kampus",
nama:"Muhammad Rizky",
afiliasi:"UMM",
role:"Laboratory Assistant",
lokasi:"Malang",
tahun:2022,
link:"https://umm.ac.id"
},

{
sumber:"Web Umum",
nama:"Muhammad Rizky",
afiliasi:"PT Teknologi Nusantara",
role:"Software Engineer",
lokasi:"Surabaya",
tahun:2024,
link:"https://example.com/profile"
}

];

}

function extractSignals(candidate){

return{

nama:candidate.nama,
afiliasi:candidate.afiliasi,
role:candidate.role,
lokasi:candidate.lokasi,
tahun:candidate.tahun,
link:candidate.link

};

}

function calculateConfidence(alumni,signal){

let score=0;

if(signal.nama.includes(alumni.nama.split(" ")[0])) score+=40;

if(signal.lokasi===alumni.kota){
score+=30;
}else{
score-=10;
}

if(signal.afiliasi.includes("UMM") || signal.afiliasi.includes("Universitas")) score+=30;

return score;

}

function crossValidate(results){

let map={};

results.forEach(r=>{

if(!map[r.nama]) map[r.nama]=0;

map[r.nama]+=r.score;

});

return map;

}

function determineStatus(score){

if(score>=120) return "Teridentifikasi dari sumber publik";

if(score>=60) return "Perlu Verifikasi Manual";

return "Belum ditemukan di sumber publik";

}

function saveEvidence(alumni,candidate,score){

let record={

tanggal:new Date().toLocaleDateString(),
sumber:candidate.sumber,
role:candidate.role,
lokasi:candidate.lokasi,
tahun:candidate.tahun,
link:candidate.link,
confidence:score

};

alumni.history.push(record);

}

function trackAlumni(alumni){

let profile=buildSearchProfile(alumni);

let queries=generateQueries(alumni);

let allResults=[];

queries.forEach(q=>{

let candidates=searchSources(q);

candidates.forEach(c=>{

let signal=extractSignals(c);

let score=calculateConfidence(alumni,signal);

saveEvidence(alumni,c,score);

allResults.push({

nama:c.nama,
score:score

});

});

});

let validation=crossValidate(allResults);

let totalScore=validation[alumni.nama] || 0;

alumni.status=determineStatus(totalScore);

displayResults(alumni);

}

function displayResults(alumni){

let div=document.getElementById("result");

div.innerHTML+=`

<div class="card result">

<b>${alumni.nama}</b><br>

Status: ${alumni.status}<br><br>

${alumni.history.map(h=>

`${h.tanggal} | ${h.sumber} | ${h.role} | ${h.lokasi} | Score:${h.confidence}
<br>Link: <a href="${h.link}" target="_blank">${h.link}</a><br><br>`

).join("")}

</div>

`;

}