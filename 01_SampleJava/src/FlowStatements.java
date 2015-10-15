
public class FlowStatements {
	
	private static void forExample() {
		for (int i = 0; i < 10; i++) {
			// 0 to 9
			System.out.println(i);
		}
	}

	private static void ifExample() {
		if (true) {
			System.out.println("called");
		}
		
		if (1>2) {
			System.out.println("not called");
		} else {
			System.out.println("called");
		}
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		forExample();
	}

}
