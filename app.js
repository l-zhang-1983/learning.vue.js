var apiURL = 'https://api.github.com/repos/vuejs/vue/commits?'
// per_page=20&page=5&sha=master

var vm = new Vue({
	el: '#app',
	data: {
		message: 'Hello World!',
		options: [
		'Option 1', 'Option 2', 'Option 3', 'Option 4',
		'Option 5', 'Option 6', 'Option 7', 'Option 8',
		'Option 9', 'Option 10'
		],
		labelPosition: 'top',
		form: {
			input: '',
			select: '',
			date: '',
			radio: '',
			checkbox: [],
			switch: false,
			slider: 30,
			textarea: ''
		},
		size: 10,
		page: 1,
		loading: true,
		dialogFormVisible: false,
		radio: 'master',
		sort: {
			name: '',
			order: 'asc'
		},
		rowName: '',
		columns: [
		{ title: 'Dessert (100g serving)', width: '200', name: 'name' },
		{ title: 'Calories', name: 'calories', width: '200', align: 'center', sortable: true },
		{ title: 'Fat (g)', name: 'fat', width: '200', align: 'center', sortable: true },
		{ title: 'Carbs (g)', name: 'carbs', width: '200', align: 'center', sortable: true },
		{ title: 'Protein (g)', name: 'protein', width: '200', align: 'center', sortable: true },
		{ title: 'Iron (%)', name: 'iron', width: '120', align: 'center', sortable: true }
		],
		list: [],
		tableData: [],
		formLabelWidth: '120px',
		formData: {}
	},
	mounted: function() {
		this.getData()
	},
	methods: {
		reverse() {
			this.message = this.message.split('').reverse().join('')
		},
		handleSortChange ({name, order}) {
			this.list = this.list.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name])
		},openSimpleDialog (row, column, cell, event) {
			// console.log('row: ' + JSON.stringify(row))
			this.formData = JSON.parse(JSON.stringify(row))
			console.log(JSON.stringify(this.formData.commit.author.name))
			this.dialogFormVisible = true
		},
		closeSimpleDialog () {
			this.dialogFormVisible = false
		},
		getData: function () {
	      this.loading = true
	      const xhr = new XMLHttpRequest()
	      const self = this
	      xhr.open('GET', apiURL + '&per_page=' + self.size + '&page=' + self.page + '&sha=' + self.radio)
	      xhr.onload = function () {
	        self.tableData = JSON.parse(xhr.responseText)
	        // console.log(self.tableData[0].html_url)
	        self.loading = false;
	      }
	      xhr.send()
	    },
	    handleSizeChange(size) {
	    	this.size = size;
	    	this.getData();
	    },
	    handleCurrentChange(page) {
	    	this.page = page;
	    	this.getData();
	    }
	},
	watch: {
		radio: function() {
			console.log(this.radio)
			this.getData()
		}
	},
	computed: {
		reverseMessage: function() {
			// console.debug(this.message)
			return this.message.split('').reverse().join('')
		},
		dataInJson: function() {
			const result = this.formData.commit
			console.log(result)
			return JSON.stringify(result)
		}
	}
})
