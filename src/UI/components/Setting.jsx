export default function Setting(props) {
	return <div className="setting" {...props}>
		<span className="material-symbols-outlined">{props.icon}</span>
		<div className="text">
			<div className="name">{props.title}</div>
			<div className="desc">{props.description}</div>
		</div>
	</div>
}