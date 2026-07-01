const SUPABASE_URL = 'zzz'
const SUPABASE_KEY = 'zzz'

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)


const form = document.getElementById('workout-form')

form.addEventListener('submit', async function (event) {
    event.preventDefault()

    const datum = document.getElementById('datum').value
    const vezba = document.getElementById('vezba').value
    const serije = document.getElementById('serije').value
    const ponavljanja = document.getElementById('ponavljanje').value

    const { data, error } = await supabaseClient
        .from('treninzi')
        .insert([
            { datum: datum, vezba: vezba, serije: serije, ponavljanja: ponavljanja }
        ])

    if (error) {
        alert('NECE')
    } else {
        alert('Uspešno sačuvano!')
        form.reset()
        ucitajTreninge()
    }
})

async function ucitajTreninge() {
    const { data, error } = await supabaseClient
        .from('treninzi')
        .select('*')
        .order('datum', { ascending: false })

    if (error) {
        alert('NECE')
        return
    }

    const lista = document.getElementById('lista-tren')
    lista.innerHTML = ''

    data.forEach(function (trening) {
        const li = document.createElement('li')
        li.textContent = `${trening.datum} — ${trening.vezba}: ${trening.serije} serije x ${trening.ponavljanja} ponavljanja`
        lista.appendChild(li)
    })
}

ucitajTreninge()