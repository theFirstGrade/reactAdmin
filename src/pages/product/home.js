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
import {reqProducts, reqSearchProducts, reqUpdateStatus} from '../../api/index'
import {productList} from '../../config/productList'
import {productList2} from '../../config/productList2'
import {PAGE_SIZE} from "../../utils/constants";

const Option = Select.Option

export default class ProductHome extends Component {

    state = {
        total: 0,
        product: productList,
        loading: false,
        searchName: '',
        searchType: 'productName'
    }

    /**
     * 更新指定商品的状态
     */
    updateStatus = (productId, status) => {
        // 因为接口没数据，所以自己写一个productList来假装status更新了
        message.success('更新商品成功')
        this.setState({product: productList2})
        this.getProducts(this.pageNum)

        const result = reqUpdateStatus(productId, status)
        if (result.status === 0) {
            message.success('更新商品成功')
            this.getProducts()
        }
    }

    getProducts = async (pageNum) => {
        this.pageNum = pageNum
        this.setState({loading: true})
        const {searchName, searchType} = this.state
        let result
        if (searchName) {
            result = await reqSearchProducts({pageNum, PAGE_SIZE, searchName, searchType})
        } else {
            result = await reqProducts(pageNum, PAGE_SIZE)
        }
        this.setState({loading: false})

        // 假装获取到了数据，实际上没有
        if (result.status === 0) {
            const {total, list} = result.data
            this.setState({
                total: productList.length,
                // product: list
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
                render: (product) => {
                    const {status, _id} = product
                    const newStatus = status === 1 ? 2 : 1
                    return (
                        <span>
                            <Button type='primary'
                                    onClick={() => this.updateStatus(_id, newStatus)}>{status === 1 ? '下架' : '上架'}</Button>
                            <span>{status === 1 ? '在售' : '已下架'}</span>
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
                            <LinkButton
                                onClick={() => this.props.history.push('/product/detail', {product})}>详情</LinkButton>
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
        const {product, total, loading, searchType} = this.state
        const title = (
            <span>
        <Select
            value={searchType}
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
        <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
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