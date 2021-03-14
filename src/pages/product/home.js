import {Component} from "react";
import {
    Card,
    Select,
    Input,
    Button,
    Icon,
    Table,
    message
} from 'antd'
import LinkButton from "../../components/link-button";
import {reqProducts} from '../../api/index'
import {productList} from '../../config/productList'
import {PAGE_SIZE} from "../../utils/constants";

const Option = Select.Option

export default class ProductHome extends Component {

    state = {
        total: 0,
        product: productList,
        loading: false
    }

    getProducts = async (pageNum) => {
        this.setState({loading: true})
        const result = await reqProducts(pageNum, 3)
        this.setState({loading: false})
        if (result.status === 0) {
            const {total, list} = result.data
            this.setState({
                total: productList.length,
            })
        }
    }

    componentDidMount() {
        this.getProducts(1)
    }

    /**
     * 初始化列
     */
    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => '￥' + price
            },
            {
                width: 100,
                title: '状态',
                dataIndex: 'status',
                render: (status) => {
                    return (
                        <span>
                            <Button type='primary'>下架</Button>
                            <span>在售</span>
                        </span>
                    )
                }
            },
            {
                width: 100,
                title: '操作',
                render: (product) => {
                    return (
                        <span>
                            <LinkButton>详情</LinkButton>
                            <LinkButton>修改</LinkButton>
                        </span>
                    )
                }
            }
        ]
    }

    componentWillMount() {
        this.initColumns()
    }

    render() {
        const {product, total, loading} = this.state
        const title = (
            <span>
        <Select
            defaultValue='按名称搜索'
            style={{width: 150}}
            onChange={value => this.setState({searchType: value})}
        >
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input
            placeholder='关键字'
            style={{width: 150, margin: '0 15px'}}
            onChange={event => this.setState({searchName: event.target.value})}
        />
        <Button type='primary'>搜索</Button>
      </span>
        )

        const extra = (
            <Button type='primary'>
                <Icon type='plus'/>
                添加商品
            </Button>
        )


        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table rowKey='_id' dataSource={product} columns={this.columns} bordered loading={loading}
                           pagination={{
                               total,
                               defaultPageSize: PAGE_SIZE,
                               showQuickJumper: true,
                               onChange: this.getProducts
                           }}
                    />
                </Card>
            </div>
        );
    }
}