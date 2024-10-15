

public class esercizio {
	public static void main(String[] args) {
			int number = Integer.parseInt(args[0]);
			
			if (number % 3 == 0) {
				System.out.println(number + " è multiplo di 3");
			} else {
				System.out.println(number + " NON è multiplo di 3");
			}
	}
}