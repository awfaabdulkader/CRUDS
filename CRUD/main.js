    "use strict"
    //Form
    let Title = document.getElementById('TitleTexes');
    let price = document.getElementById('Price');
    let ADS = document.getElementById('ADS');
    let Discount = document.getElementById('Discount');
    let Taxes = document.getElementById('Taxes');
    let Count = document.getElementById('count');
    let category = document.getElementById('Category');
    let search = document.getElementById('search');
    let FormI = document.getElementById('FormI');
    let LiInput = document.getElementsByClassName('LiInput')
    let header = document.getElementById('ConHeader')
    let body = document.body
    let menu = document.getElementById('MenuInfo')
    let table = document.getElementById('table')
    let UserMood = 'create';
    let Global;
    //btn
    let btnCreate = document.getElementById('Create');
    let BtnByCategory = document.getElementById('bycategory');
    let BtnByTitle = document.getElementById('bytitle');
    let BtnDelet = document.getElementById('Delet');
    let BtnTotal = document.getElementById('Total');
    let ModeDark = document.getElementById('dark')
    let btnscroll = document.getElementById('btnScroll')
    let fontScroll = document.getElementById('ScrollId')

    window.onscroll = function(){
        if (scrollY >=519){
            btnscroll.style.display='block'
        }else{
            btnscroll.style.display='none'
        }
    }
    btnscroll.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    //function mode 
    ModeDark.addEventListener('click', function () {
        if (this.classList.contains('fa-moon')) {
            this.classList.remove('fa-moon'),
                this.classList.add('fa-sun'),
                body.style.backgroundColor = "#1e1d1d";
            FormI.style.backgroundColor = ('white');
            FormI.style.boxShadow = ' 0px 0px 26px 12px black'
            header.style.boxShadow = '0px 0px 15px -1px rgb(255 252 252 / 80%)'
            table.style.color = '#ffffffbf'
            btnCreate.style.backgroundColor = "black"
            BtnTotal.style.backgroundColor = "black"
            BtnDelet.style.backgroundColor = "black"
            BtnByTitle.style.backgroundColor = "black"
            BtnByCategory.style.backgroundColor = "black"
            btnCreate.style.color = " white"
            BtnTotal.style.color = " white"
            BtnDelet.style.color = " white"
            BtnByTitle.style.color = " white"
            BtnByCategory.style.color = " white"
        } else if (this.classList.contains('fa-sun')) {
            this.classList.remove('fa-sun'),
                this.classList.add('fa-moon'),
                body.style.backgroundColor = "white";
            FormI.style.boxShadow = '0px 0px 26px 12px gold'
            FormI.style.backgroundColor = '#000000d6';
            header.style.boxShadow = '0px 0px 0px 0px rgb(255 252 252 / 80%)'
            table.style.color = 'black'
            table.style.color = 'black'
            btnCreate.style.backgroundColor = "gold"
            BtnTotal.style.backgroundColor = "gold"
            BtnDelet.style.backgroundColor = "gold"
            BtnBycategory.style.backgroundColor = "gold"
            BtnByTitle.style.backgroundColor = "gold"
            btnCreate.style.color = " black"
            BtnTotal.style.color = " black"
            BtnDelet.style.color = " black"
            BtnByC.style.color = " black"
            BtnByTitle.style.color = " black"
        }
        Title.focus
    });



    //function total
    function SumTotal() {
        if (price.value != '') {
            let resultats = (+price.value + +ADS.value + +Taxes.value) - +Discount.value
            BtnTotal.innerHTML = resultats;
            BtnTotal.style.backgroundColor = 'green'
        } else {
            BtnTotal.innerHTML = "Total";
            BtnTotal.style.backgroundColor = 'gold'
        }
    }

    // function create

    let CreateData;//use array to storage data
    if (localStorage.product != null) {
        CreateData = JSON.parse(localStorage.product)
    } else {
        CreateData = []//Initialize an empty array to store data
    }//if we upload page data don't delet



    btnCreate.addEventListener('click', function (event) {// Add 'event' parameter
        event.preventDefault(); // Prevent the default form submission

        let CreateObject = {
            title: TitleTexes.value.toLowerCase(),
            price: price.value.toLowerCase(),
            ADS: ADS.value.toLowerCase(),
            Taxes: Taxes.value.toLowerCase(),
            Discount: Discount.value.toLowerCase(),
            Total: BtnTotal.innerHTML.toLowerCase(),
            Count: Count.value.toLowerCase(),
            category: category.value.toLowerCase(),
        };
        //clear 
        //count
        if(Title.value!=''
            &&price.value!=''
            &&category.value!=''
            &&CreateObject.Count<=100
        
        ){
            if (UserMood === 'create') {
                if (CreateObject.Count > 0) {
                    for (let i = 0; i < CreateObject.Count; i++) {
                        CreateData.push(CreateObject);
                    }
                } else {
                    CreateData.push(CreateObject);
                }
            } else {
                CreateData[Global] = CreateObject
                Count.style.display = 'block'
                btnCreate.innerHTML = 'Create'
    
    

            }
            clearinput()
            ReadData();
        }
      


        localStorage.setItem('product', JSON.stringify(CreateData));
      
       
    });



    //clear input
    function clearinput() {
        Title.value = ''
        price.value = ''
        ADS.value = ''
        Taxes.value = ''
        Discount.value = ''
        BtnTotal.innerHTML = '',//not value
            Count.value = ''
        category.value = ''
    }
    //function show data in table responsible for generating html rows based on the data in creatdata and updating the contents
    function ReadData() {
        SumTotal()
        let table = "";
        for (let i = 0; i < CreateData.length; i++) {
            table += `
            <tr>
                <td>${i+1}</td>
                <td>${CreateData[i].title}</td>
                <td>${CreateData[i].price}</td>
                <td>${CreateData[i].Taxes}</td>
                <td>${CreateData[i].ADS}</td>
                <td>${CreateData[i].Discount}</td>
                <td>${CreateData[i].Total}</td>
                <td>${CreateData[i].category}</td>
                <td><i class="fa-solid fa-trash bttres testtd" onclick= DeletOneItem(${i}) style="color: #000000;"></i></td>
                <td><i class="fa-solid fa-pen bttres" style="color: #000000;" onclick=UpdateOneItem(${i})></i></td>
            </tr>`;
        }
        document.getElementById('tbody').innerHTML = table;

    }
    ReadData();

    //function delet one item
    function DeletOneItem(i) {// i => index
        CreateData.splice(i, 1)
        localStorage.product = JSON.stringify(CreateData)
        ReadData()
    }


    // function update
    function UpdateOneItem(i){
        Title.value = CreateData[i].title
        ADS.value = CreateData[i].ADS
        price.value = CreateData[i].price
        Taxes.value = CreateData[i].Taxes
        Discount.value = CreateData[i].Discount
        category.value = CreateData[i].category
        SumTotal()
        console.log(i)
        Count.style.display = 'none'
        btnCreate.innerHTML = 'Update'

        scroll({
            left: 0,
            behavior: "smooth"
        })
        UserMood = 'ipdate'
        Global = i
    }



    // function Delete all
    BtnDelet.addEventListener('click', function () {
        localStorage.clear()
        CreateData.splice(0)

        ReadData(); // Update the table
    });


    //search moode 
    let searchMood = "title";
    function GetIdSearch(id) {

        let search = document.getElementById('search')
        if (id == 'bytitle') {
            searchMood = 'title'
            search.style.display = 'block';
        

        } else  {
            searchMood = "category"
            search.style.display = 'block';
        
        }
            search.placeholder='search by'+searchMood
            search.focus()
            search.value='';
        ReadData()
    }
    /*BtnByTitle.addEventListener('click' , function(){
            if(search.value===''){
    search.style.display = 'none';
            }
        
    })
    */
    //saerch by title or category 
    function DataSearch(value) {
        let table ='';
        for (let i = 0; i < CreateData.length; i++) {
        if (searchMood == 'title') {
           
                //includes
                if (CreateData[i].title.includes(value.toLowerCase())) {
                    //for bring data
                    table += `
                    <tr>
                        <td>${i}</td>
                        <td>${CreateData[i].title}</td>
                        <td>${CreateData[i].price}</td>
                        <td>${CreateData[i].Taxes}</td>
                        <td>${CreateData[i].ADS}</td>
                        <td>${CreateData[i].Discount}</td>
                        <td>${CreateData[i].Total}</td>
                        <td>${CreateData[i].category}</td>
                        <td><i class="fa-solid fa-trash bttres testtd" onclick= DeletOneItem(${i}) style="color: #000000;"></i></td>
                        <td><i class="fa-solid fa-pen bttres" style="color: #000000;" onclick=UpdateOneItem(${i})></i></td>
                    </tr>`;
        
                }
            
        } else {
          
                //includes
                if (CreateData[i].category.includes(value.toLowerCase())) {
                    //for bring data
                    table += `
                        <tr>
                            <td>${i}</td>
                            <td>${CreateData[i].title}</td>
                            <td>${CreateData[i].price}</td>
                            <td>${CreateData[i].Taxes}</td>
                            <td>${CreateData[i].ADS}</td>
                            <td>${CreateData[i].Discount}</td>
                            <td>${CreateData[i].Total}</td>
                            <td>${CreateData[i].category}</td>
                            <td><i class="fa-solid fa-trash bttres testtd" onclick= DeletOneItem(${i}) style="color: #000000;"></i></td>
                            <td><i class="fa-solid fa-pen bttres" style="color: #000000;" onclick=UpdateOneItem(${i})></i></td>
                        </tr>
                        `;
                }
            }
         document.getElementById('tbody').innerHTML = table;
        }
    }
    


//clean Data



    //function focus
    //function scroll
    //function menu


